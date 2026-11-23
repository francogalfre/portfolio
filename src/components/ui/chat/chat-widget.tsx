import { AnimatePresence, LazyMotion } from "framer-motion";

const loadMotion = () => import("@/utils/motion-features").then((mod) => mod.default);

import { lazy, Suspense, useState } from "react";
import { ChatLauncher } from "./chat-launcher";
const ChatPanel = lazy(() => import("./chat-panel").then((m) => ({ default: m.ChatPanel })));
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
            <LazyMotion features={loadMotion} strict>
            <AnimatePresence>
                {isOpen && (
                    <Suspense fallback={null}>
                        <ChatPanel
                            messages={messages}
                            error={error}
                            isOnline={enabled}
                            isInputDisabled={isInputDisabled}
                            inputPlaceholder={inputPlaceholder}
                            isThinking={isSending}
                            onSend={sendMessage}
                        />
                    </Suspense>
                )}
            </AnimatePresence>
            </LazyMotion>

            <ChatLauncher isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />
        </div>
    );
}
