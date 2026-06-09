import { motion } from "framer-motion";

type ChatWelcomeProps = {
    isOnline: boolean;
    suggestions: string[];
    onSelectSuggestion: (question: string) => void;
};

export function ChatWelcome({
    isOnline,
    suggestions,
    onSelectSuggestion,
}: ChatWelcomeProps) {
    return (
        <div className="flex flex-col gap-4 py-1">
            <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-[14px] leading-relaxed text-muted-foreground"
            >
                {isOnline
                    ? "Hi, I'm Franco's AI assistant. Ask me anything about his work, projects, and skills — or whether he's open to new opportunities."
                    : "Franco's assistant is offline right now. Please check back later."}
            </motion.p>
            {isOnline && (
            <div className="flex flex-col gap-2">
                {suggestions.map((question, index) => (
                    <motion.button
                        key={question}
                        type="button"
                        onClick={() => onSelectSuggestion(question)}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: 0.06 * (index + 1),
                        }}
                        className="rounded-lg border border-border px-3 py-2 text-left text-[13px] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                        {question}
                    </motion.button>
                ))}
            </div>
            )}
        </div>
    );
}
