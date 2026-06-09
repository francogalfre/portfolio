import type { ToolPart } from "@/types/chat";

const TOOL_LABELS: Record<string, { running: string; done: string }> = {
  vectorQueryTool: {
    running: "Searching Franco's knowledge base",
    done: "Searched Franco's knowledge base",
  },
};

export function getToolLabel(toolName: string) {
  return (
    TOOL_LABELS[toolName] ?? {
      running: `Running ${toolName}`,
      done: `Used ${toolName}`,
    }
  );
}

export function appendToolCall(
  tools: ToolPart[],
  call: { toolCallId?: string; toolName: string; input?: unknown },
): ToolPart[] {
  return [
    ...tools,
    {
      id: call.toolCallId ?? crypto.randomUUID(),
      toolName: call.toolName,
      state: "input-available",
      input: call.input,
    },
  ];
}

export function markToolComplete(
  tools: ToolPart[],
  toolCallId: string | undefined,
  output: unknown,
): ToolPart[] {
  let index = toolCallId
    ? tools.findIndex(
        (tool) => tool.id === toolCallId && tool.state === "input-available",
      )
    : -1;
  if (index === -1) {
    index = tools.map((tool) => tool.state).lastIndexOf("input-available");
  }
  if (index === -1) return tools;
  return tools.map((tool, i) =>
    i === index ? { ...tool, state: "output-available", output } : tool,
  );
}

export type GroupedTool = { toolName: string; state: ToolPart["state"] };

export function groupToolsByName(tools: ToolPart[]): GroupedTool[] {
  const byName = new Map<string, GroupedTool>();
  for (const tool of tools) {
    const existing = byName.get(tool.toolName);
    if (!existing) {
      byName.set(tool.toolName, { toolName: tool.toolName, state: tool.state });
      continue;
    }
    if (tool.state === "input-available") existing.state = "input-available";
    else if (existing.state !== "input-available") existing.state = tool.state;
  }
  return [...byName.values()];
}
