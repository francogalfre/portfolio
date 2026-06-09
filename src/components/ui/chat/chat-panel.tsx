import { motion } from "framer-motion";
import type { ChatMessage } from "@/types/chat";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { PANEL_TRANSITION, SUGGESTED_QUESTIONS } from "./constants";
import { MessageInput } from "./message-input";

type ChatPanelProps = {
  messages: ChatMessage[];
  error: string | null;
  isOnline: boolean;
  isInputDisabled: boolean;
  inputPlaceholder: string;
  onSend: (text: string) => void;
};

export function ChatPanel({
  messages,
  error,
  isOnline,
  isInputDisabled,
  inputPlaceholder,
  onSend,
}: ChatPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={PANEL_TRANSITION}
      className="fixed bottom-24 right-4 z-50 flex origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-background sm:right-8"
      style={{
        width: "min(440px, calc(100vw - 2rem))",
        height: "min(76vh, 580px)",
      }}
    >
      <ChatHeader online={isOnline} />
      <ChatMessages
        messages={messages}
        error={error}
        isOnline={isOnline}
        suggestions={SUGGESTED_QUESTIONS}
        onSelectSuggestion={onSend}
      />
      <MessageInput
        onSend={onSend}
        disabled={isInputDisabled}
        placeholder={inputPlaceholder}
      />
    </motion.div>
  );
}
