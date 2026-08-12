import { cn } from "@/lib/utils";

import AgentAvatar from "@/assets/agent-avatar.webp";

type ChatHeaderProps = {
    online: boolean;
};

export function ChatHeader({ online }: ChatHeaderProps) {
    return (
        <header className="flex items-center gap-3.5 border-b border-border px-5 py-4">
            <div className="relative shrink-0 transition-transform duration-300 ease-out hover:scale-105">
                <img
                    src={AgentAvatar.src}
                    width="96"
                    height="96"
                    alt="Franco robot version avatar"
                    className="size-14 rounded-full object-cover ring-1 ring-border"
                />
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
