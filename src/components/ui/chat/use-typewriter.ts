import { useEffect, useRef, useState } from "react";

const CHAR_INTERVAL_MS = 12;

export function useTypewriter(text: string, active: boolean) {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!active || !text) return;
        setIndex(0);

        intervalRef.current = setInterval(() => {
            setIndex((i) => {
                if (i >= text.length) {
                    clearInterval(intervalRef.current!);
                    return i;
                }
                return i + 1;
            });
        }, CHAR_INTERVAL_MS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, active]);

    return {
        displayed: text.slice(0, index),
        isAnimating: index < text.length,
    };
}
