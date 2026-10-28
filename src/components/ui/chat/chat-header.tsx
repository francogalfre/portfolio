import { cn } from "@/lib/utils";

import { AgentAvatar, type AgentAvatarState } from "./agent-avatar";

type ChatHeaderProps = {
    online: boolean;
    avatarState?: AgentAvatarState;
};

export function ChatHeader({ online, avatarState }: ChatHeaderProps) {
    return (
        <header className="flex items-center gap-3.5 border-b border-border px-5 py-4">
            <div className="relative shrink-0 rounded-full p-1.5 ring-1 ring-border">
                <AgentAvatar state={avatarState} size={36} />
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-[15.5px] font-medium leading-none tracking-tight text-foreground">
                    Franco's assistant
                </span>
                <span className="flex items-center gap-1.5 text-[13.5px] leading-none text-muted-foreground">
                    <span
                        className={cn(
                            "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                            online ? "bg-emerald-500" : "bg-muted-foreground/40",
                        )}
                    />
                    {online ? "Online" : "Offline"}
                </span>
            </div>
        </header>
    );
}
