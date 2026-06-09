import { AiBrain01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import {
    Message,
    MessageContent,
    MessageResponse,
} from "@/components/ai-elements/message";
import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import type { AssistantMessage as AssistantMessageData } from "@/types/chat";
import { AnimatedText } from "./animated-text";
import { MESSAGE_TRANSITION } from "./constants";
import { ToolActivity } from "./tool-activity";

type AssistantMessageProps = {
    message: AssistantMessageData;
};

export function AssistantMessage({ message }: AssistantMessageProps) {
    const isThinking =
        message.status === "pending" && !message.text && message.tools.length === 0;
    const hasThinkingActivity =
        Boolean(message.reasoning) || message.tools.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={MESSAGE_TRANSITION}
        >
            <Message from="assistant">
                {hasThinkingActivity && (
                    <div className="flex flex-col gap-2">
                        {message.reasoning && (
                            <Reasoning
                                isStreaming={message.reasoningStreaming}
                                defaultOpen={false}
                            >
                                <ReasoningTrigger />
                                <ReasoningContent>{message.reasoning}</ReasoningContent>
                            </Reasoning>
                        )}
                        <ToolActivity tools={message.tools} />
                    </div>
                )}

                <MessageContent className={hasThinkingActivity ? "mt-2.5" : undefined}>
                    {isThinking ? (
                        <div className="flex w-fit items-center gap-1.5 text-secondary">
                            <HugeiconsIcon
                                icon={AiBrain01Icon}
                                size={16}
                                className="animate-pulse"
                            />
                            <span className="animate-pulse text-[14.5px] font-light">
                                Thinking…
                            </span>
                        </div>
                    ) : message.status === "streaming" ? (
                        <AnimatedText text={message.text} />
                    ) : (
                        <MessageResponse>{message.text}</MessageResponse>
                    )}
                </MessageContent>
            </Message>
        </motion.div>
    );
}
