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
          <p className="px-2 text-center text-[12px] text-destructive">
            {error}
          </p>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
