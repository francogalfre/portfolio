import { BubbleChatIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
      className="flex items-center justify-center rounded-full bg-gray-100 p-4 text-secondary transition-colors duration-300 hover:text-primary"
    >
      <HugeiconsIcon icon={isOpen ? Cancel01Icon : BubbleChatIcon} size={22} />
    </button>
  );
}
