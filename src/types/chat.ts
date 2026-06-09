export type RagStreamRequest = {
  messages: { role: "user"; content: string }[];
  threadId: string;
  resourceId: string;
};

export type RateLimitState = {
  remaining: number;
  resetAt: number | null;
};

export type StreamEvent =
  | { type: "text-delta"; payload: { text: string } }
  | { type: "reasoning-delta"; payload: { text: string } }
  | {
      type: "tool-call";
      payload: { toolName: string; toolCallId?: string; args?: unknown };
    }
  | {
      type: "tool-result";
      payload: { toolName?: string; toolCallId?: string; result?: unknown };
    }
  | { type: "step-start"; payload?: Record<string, unknown> }
  | { type: "finish"; payload?: Record<string, unknown> }
  | { type: "error"; payload: { message: string } };

export type ToolState = "input-available" | "output-available" | "output-error";

export type ToolPart = {
  id: string;
  toolName: string;
  state: ToolState;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

export type AssistantStatus = "pending" | "streaming" | "done" | "error";

export type UserMessage = {
  id: string;
  role: "user";
  text: string;
};

export type AssistantMessage = {
  id: string;
  role: "assistant";
  reasoning: string;
  reasoningStreaming: boolean;
  tools: ToolPart[];
  text: string;
  status: AssistantStatus;
};

export type ChatMessage = UserMessage | AssistantMessage;
