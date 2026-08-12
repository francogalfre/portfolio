import { BubbleChatIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "framer-motion";

type ChatLauncherProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function ChatLauncher({ isOpen, onToggle }: ChatLauncherProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close chat" : "Chat with Franco's assistant"}
      className="flex items-center justify-center rounded-full bg-gray-100 p-4 text-secondary transition-all duration-300 hover:scale-105 hover:text-primary active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <HugeiconsIcon icon={isOpen ? Cancel01Icon : BubbleChatIcon} size={22} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
