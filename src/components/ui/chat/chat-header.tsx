import { cn } from "@/lib/utils";

import AgentAvatar from "@/assets/agent-avatar.png"

type ChatHeaderProps = {
    online: boolean;
};

export function ChatHeader({ online }: ChatHeaderProps) {
    return (
        <header className="flex items-center gap-3 border-b border-border px-3 py-5">
            <div className="relative shrink-0">
                <div className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
                    <img src={AgentAvatar.src} width="200" height="200" className="rounded-full border border-primary" alt="Franco robot version avatar" />
                </div>
                <span
                    className={cn(
                        "absolute top-0 -right-0.5 size-3 rounded-full border-2 border-background",
                        online ? "bg-primary" : "bg-muted-foreground/50",
                    )}
                />
            </div>
            <div className="flex flex-col gap-2 pt-2">
                <span className="text-[14px] leading-0.5 font-medium text-foreground">
                    Franco's assistant
                </span>
                <span className="text-[11px] text-muted-foreground">
                    {online ? "Online" : "Offline"}
                </span>
            </div>
        </header>
    );
}
