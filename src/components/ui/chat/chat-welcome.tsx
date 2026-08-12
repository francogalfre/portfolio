import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import { SMOOTH_EASE } from "./constants";

type ChatWelcomeProps = {
  isOnline: boolean;
  suggestions: string[];
  onSelectSuggestion: (question: string) => void;
};

export function ChatWelcome({ isOnline, suggestions, onSelectSuggestion }: ChatWelcomeProps) {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex flex-col gap-1.5">
        <motion.p
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: SMOOTH_EASE }}
          className="text-[15.5px] font-medium tracking-tight text-foreground"
        >
          {isOnline ? "Hi, I'm Franco's AI assistant." : "Franco's assistant is offline"}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: SMOOTH_EASE, delay: 0.08 }}
          className="text-[13.5px] leading-relaxed text-muted-foreground"
        >
          {isOnline
            ? "Ask me anything about his work, projects, and skills — or whether he's open to work."
            : "I'm not around right now — please try again in a bit."}
        </motion.p>
      </div>

      {isOnline && (
        <div className="flex flex-col gap-2">
          {suggestions.map((question, index) => (
            <motion.button
              key={question}
              type="button"
              onClick={() => onSelectSuggestion(question)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98, transition: { duration: 0.12, delay: 0 } }}
              transition={{ duration: 0.35, ease: SMOOTH_EASE, delay: 0.16 + 0.06 * index }}
              className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-left text-[13px] text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:border-primary/60 hover:bg-primary/[0.04] hover:text-foreground"
            >
              <span>{question}</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                className="-translate-x-1 shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
