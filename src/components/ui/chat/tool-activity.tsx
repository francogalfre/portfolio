import { Loading03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Shimmer } from "@/components/ai-elements/shimmer";
import type { ToolPart } from "@/types/chat";
import { getToolLabel, groupToolsByName } from "@/utils/chat/tools";

type ToolActivityProps = {
  tools: ToolPart[];
};

export function ToolActivity({ tools }: ToolActivityProps) {
  const groupedTools = groupToolsByName(tools);
  if (groupedTools.length === 0) return null;

  return (
    <div className="flex flex-col gap-0.5">
      {groupedTools.map((tool) => {
        const label = getToolLabel(tool.toolName);
        const isRunning = tool.state === "input-available";

        return (
          <div
            key={tool.toolName}
            className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground/80"
          >
            {isRunning ? (
              <>
                <HugeiconsIcon
                  icon={Loading03Icon}
                  size={13}
                  className="animate-spin text-muted-foreground"
                />
                <Shimmer className="text-[12.5px]">{label.running}…</Shimmer>
              </>
            ) : (
              <>
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={13}
                  className="text-primary"
                />
                <span>{label.done}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
