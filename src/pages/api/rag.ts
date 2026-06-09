export const prerender = false;

import type { APIRoute } from "astro";
import type { RagStreamRequest } from "@/types/chat";
import { AGENT_ENABLED, AGENT_URL } from "@/utils/chat/agent";

const FORWARDED_RESPONSE_HEADERS = [
    "Retry-After",
    "X-RateLimit-Limit",
    "X-RateLimit-Remaining",
    "X-RateLimit-Reset",
];

function getClientIp(request: Request): string | null {
    return (
        request.headers.get("cf-connecting-ip") ??
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        null
    );
}

export const POST: APIRoute = async ({ request }) => {
    if (!AGENT_ENABLED) {
        return new Response(JSON.stringify({ error: "Assistant is offline" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
        });
    }

    let body: RagStreamRequest;

    try {
        body = (await request.json()) as RagStreamRequest;
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const upstreamHeaders: Record<string, string> = { "Content-Type": "application/json" };
    const clientIp = getClientIp(request);

    if (clientIp) {
        upstreamHeaders["x-forwarded-for"] = clientIp;
        upstreamHeaders["cf-connecting-ip"] = clientIp;
    }

    let upstream: Response;

    try {
        upstream = await fetch(`${AGENT_URL}/api/agents/rag-agent/stream`, {
            method: "POST",
            headers: upstreamHeaders,
            body: JSON.stringify(body),
        });
    } catch {
        return new Response(JSON.stringify({ error: "Could not reach the assistant" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
        });
    }

    const responseHeaders = new Headers({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
    });

    for (const header of FORWARDED_RESPONSE_HEADERS) {
        const value = upstream.headers.get(header);
        if (value) responseHeaders.set(header, value);
    }

    if (!upstream.body) {
        return new Response(null, { status: upstream.status, headers: responseHeaders });
    }

    const reader = upstream.body.getReader();
    const stream = new ReadableStream({
        async pull(controller) {
            try {
                const { done, value } = await reader.read();
                if (done) controller.close();
                else controller.enqueue(value);
            } catch {
                controller.close();
            }
        },
        cancel() {
            reader.cancel().catch(() => { });
        },
    });

    return new Response(stream, { status: upstream.status, headers: responseHeaders });
};
