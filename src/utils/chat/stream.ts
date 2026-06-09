import type { StreamEvent } from "@/types/chat";

function parseLine(line: string): StreamEvent | null {
  if (!line.startsWith("data: ") || line === "data: [DONE]") return null;
  try {
    return JSON.parse(line.slice(6)) as StreamEvent;
  } catch {
    return null;
  }
}

export async function* parseStream(
  response: Response,
): AsyncGenerator<StreamEvent> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const event = parseLine(line);
      if (event) yield event;
    }
  }

  const event = parseLine(buffer);
  if (event) yield event;
}
