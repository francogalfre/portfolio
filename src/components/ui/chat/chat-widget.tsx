import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";
import { useChat } from "./use-chat";

type ChatWidgetProps = {
    enabled?: boolean;
};

export function ChatWidget({ enabled = true }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, error, isSending, isRateLimited, sendMessage } = useChat();

    const isInputDisabled = !enabled || isSending || isRateLimited;
    const inputPlaceholder = !enabled
        ? "Assistant is offline"
        : isRateLimited
            ? "Please wait a moment…"
            : "Ask anything…";

    return (
        <div className="relative">
            <AnimatePresence>
                {isOpen && (
                    <ChatPanel
                        messages={messages}
                        error={error}
                        isOnline={enabled}
                        isInputDisabled={isInputDisabled}
                        inputPlaceholder={inputPlaceholder}
                        onSend={sendMessage}
                    />
                )}
            </AnimatePresence>

            <ChatLauncher isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />
        </div>
    );
}
