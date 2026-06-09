import { SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type KeyboardEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MAX_TEXTAREA_HEIGHT = 96;

type MessageInputProps = {
    onSend: (text: string) => void;
    disabled: boolean;
    placeholder?: string;
};

export function MessageInput({
    onSend,
    disabled,
    placeholder,
}: MessageInputProps) {
    const [draft, setDraft] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const canSend = draft.trim().length > 0 && !disabled;

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
    };

    const handleSubmit = () => {
        if (!canSend) return;
        onSend(draft.trim());
        setDraft("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="px-3 py-3">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-3.5 py-2.5 transition-colors duration-200 focus-within:border-primary">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={draft}
                    disabled={disabled}
                    aria-label="Type your message"
                    placeholder={placeholder ?? "Ask anything…"}
                    onChange={(event) => {
                        setDraft(event.target.value);
                        adjustHeight();
                    }}
                    onKeyDown={handleKeyDown}
                    className="max-h-24 flex-1 resize-none bg-transparent py-1 text-[14px] font-light leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSend}
                    aria-label="Send message"
                    className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                        canSend
                            ? "bg-primary text-primary-foreground hover:scale-105"
                            : "bg-muted text-muted-foreground",
                    )}
                >
                    <HugeiconsIcon icon={SentIcon} size={16} />
                </button>
            </div>
        </div>
    );
}
