import { existsSync, readFileSync } from "node:fs";

// Load environment variables, merging process.env with a local .env file.
export function loadEnv() {
    const env = { ...process.env };
    const envPath = new URL("../.env", import.meta.url);

    // In CI there is no .env file — credentials are already in process.env.
    if (!existsSync(envPath)) return env;

    const raw = readFileSync(envPath, "utf-8");
    for (const line of raw.split("\n")) {
        const match = line.trim().match(/^([A-Z0-9_]+)=(.*)$/);
        if (match) env[match[1]] = match[2];
    }
    return env;
}
