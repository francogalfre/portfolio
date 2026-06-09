import { useCallback, useRef, useState } from "react";
import type {
  AssistantMessage,
  ChatMessage,
  RateLimitState,
} from "@/types/chat";
import { getSession } from "@/utils/chat/session";
import { parseStream } from "@/utils/chat/stream";
import { appendToolCall, markToolComplete } from "@/utils/chat/tools";

const DEFAULT_RATE_LIMIT = 15;
const DEFAULT_RETRY_AFTER_SECONDS = 60;

function createAssistantMessage(id: string): AssistantMessage {
  return {
    id,
    role: "assistant",
    reasoning: "",
    reasoningStreaming: false,
    tools: [],
    text: "",
    status: "pending",
  };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimitState>({
    remaining: DEFAULT_RATE_LIMIT,
    resetAt: null,
  });

  const session = useRef(getSession());

  const isRateLimited =
    rateLimit.remaining <= 0 &&
    rateLimit.resetAt !== null &&
    Date.now() < rateLimit.resetAt;

  const updateAssistantMessage = useCallback(
    (id: string, update: (message: AssistantMessage) => AssistantMessage) => {
      setMessages((current) =>
        current.map((message) =>
          message.id === id && message.role === "assistant"
            ? update(message)
            : message,
        ),
      );
    },
    [],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (isSending || isRateLimited) return;

      const assistantId = crypto.randomUUID();
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "user", text },
        createAssistantMessage(assistantId),
      ]);
      setIsSending(true);
      setError(null);

      try {
        const response = await fetch("/api/rag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: text }],
            threadId: session.current.threadId,
            resourceId: session.current.resourceId,
          }),
        });

        setRateLimit({
          remaining: Number(
            response.headers.get("X-RateLimit-Remaining") ?? DEFAULT_RATE_LIMIT,
          ),
          resetAt:
            Number(response.headers.get("X-RateLimit-Reset") ?? "0") * 1000 ||
            null,
        });

        if (response.status === 429) {
          const retryAfterSeconds = Number(
            response.headers.get("Retry-After") ?? DEFAULT_RETRY_AFTER_SECONDS,
          );
          const minutes = Math.floor(retryAfterSeconds / 60);
          const seconds = retryAfterSeconds % 60;
          const timeStr =
            minutes > 0
              ? seconds > 0
                ? `${minutes}m ${seconds}s`
                : `${minutes}m`
              : `${seconds}s`;
          setError(`You've reached the message limit. Try again in ${timeStr}.`);
          setMessages((current) =>
            current.filter((message) => message.id !== assistantId),
          );
          return;
        }

        if (!response.ok) {
          throw new Error("Couldn't reach the assistant. Please try again.");
        }

        for await (const event of parseStream(response)) {
          switch (event.type) {
            case "reasoning-delta":
              updateAssistantMessage(assistantId, (message) => ({
                ...message,
                reasoning: message.reasoning + event.payload.text,
                reasoningStreaming: true,
              }));
              break;

            case "tool-call":
              updateAssistantMessage(assistantId, (message) => ({
                ...message,
                reasoningStreaming: false,
                tools: appendToolCall(message.tools, {
                  toolCallId: event.payload.toolCallId,
                  toolName: event.payload.toolName,
                  input: event.payload.args,
                }),
              }));
              break;

            case "tool-result":
              updateAssistantMessage(assistantId, (message) => ({
                ...message,
                tools: markToolComplete(
                  message.tools,
                  event.payload.toolCallId,
                  event.payload.result,
                ),
              }));
              break;

            case "text-delta":
              updateAssistantMessage(assistantId, (message) => ({
                ...message,
                reasoningStreaming: false,
                text: message.text + event.payload.text,
                status: "streaming",
              }));
              break;

            case "finish":
              updateAssistantMessage(assistantId, (message) => ({
                ...message,
                reasoningStreaming: false,
                status: "done",
              }));
              break;

            case "error":
              throw new Error(event.payload.message);
          }
        }
      } catch (caughtError) {
        const fallbackMessage =
          caughtError instanceof Error
            ? caughtError.message
            : "Something went wrong.";
        updateAssistantMessage(assistantId, (message) => ({
          ...message,
          text: message.text || fallbackMessage,
          status: "error",
        }));
      } finally {
        setIsSending(false);
        updateAssistantMessage(assistantId, (message) => ({
          ...message,
          reasoningStreaming: false,
          status: message.status === "error" ? "error" : "done",
        }));
      }
    },
    [isSending, isRateLimited, updateAssistantMessage],
  );

  return { messages, error, isSending, isRateLimited, sendMessage };
}
