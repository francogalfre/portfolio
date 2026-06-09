import { Time01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import type { ChatMessage } from "@/types/chat";
import { AssistantMessage } from "./assistant-message";
import { ChatWelcome } from "./chat-welcome";
import { MESSAGE_TRANSITION } from "./constants";

type ChatMessagesProps = {
  messages: ChatMessage[];
  error: string | null;
  isOnline: boolean;
  suggestions: string[];
  onSelectSuggestion: (question: string) => void;
};

export function ChatMessages({
  messages,
  error,
  isOnline,
  suggestions,
  onSelectSuggestion,
}: ChatMessagesProps) {
  const isEmpty = messages.length === 0;

  return (
    <Conversation className="flex-1">
      <ConversationContent>
        {isEmpty && (
          <ChatWelcome
            isOnline={isOnline}
            suggestions={suggestions}
            onSelectSuggestion={onSelectSuggestion}
          />
        )}

        {messages.map((message) =>
          message.role === "user" ? (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={MESSAGE_TRANSITION}
            >
              <Message from="user">
                <MessageContent>{message.text}</MessageContent>
              </Message>
            </motion.div>
          ) : (
            <AssistantMessage key={message.id} message={message} />
          ),
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={MESSAGE_TRANSITION}
            className="flex justify-center px-4 py-1"
          >
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-400">
              <HugeiconsIcon icon={Time01Icon} size={13} className="shrink-0" />
              <span className="text-[12px] leading-snug">{error}</span>
            </div>
          </motion.div>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
