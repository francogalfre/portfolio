import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type AgentAvatarState = "idle" | "typing" | "thinking";

type AgentAvatarProps = {
    state?: AgentAvatarState;
    size?: number;
    className?: string;
};

const SPRING = { stiffness: 140, damping: 16, mass: 0.6 };
const clamp = (n: number) => Math.max(-1, Math.min(1, n));

export function AgentAvatar({
    state = "idle",
    size = 56,
    className,
}: AgentAvatarProps) {
    const reduced = useReducedMotion();
    const svgRef = useRef<SVGSVGElement>(null);
    const hoverRef = useRef(false);
    const stateRef = useRef(state);
    const [hovered, setHovered] = useState(false);

    // normalized pointer position (-1..1) relative to the avatar, written without re-rendering
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const lookX = useMotionValue(0); // idle look-around
    const nod = useMotionValue(0);
    const float = useMotionValue(0);
    const bounce = useMotionValue(0);
    const squash = useMotionValue(1);
    const antennaRot = useMotionValue(0);
    const blink = useMotionValue(1);
    const earPulse = useMotionValue(0);
    const ballGlow = useMotionValue(0);
    const thinkLook = useMotionValue(0);
    const typeLook = useMotionValue(0);

    const sx = useSpring(px, SPRING);
    const sy = useSpring(py, SPRING);
    const sLookX = useSpring(lookX, SPRING);
    const sThink = useSpring(thinkLook, SPRING);
    const sType = useSpring(typeLook, SPRING);
    const sAntenna = useSpring(antennaRot, { stiffness: 120, damping: 6 });

    const headRotate = useTransform(sx, (v) => v * (hovered ? 9 : 3));
    const headX = useTransform(sx, (v) => v * 4);
    const headY = useTransform([float, nod, bounce], ([f, n, b]: number[]) => f + n + b);
    const eyeX = useTransform([sx, sLookX], ([x, l]: number[]) => x * 14 + l);
    const eyeY = useTransform([sy, sThink, sType], ([y, t, d]: number[]) => y * 8 - t * 10 + d * 10);
    const eyesScaleY = blink;
    const mouthScale = hovered ? 1.45 : 1;

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // global pointer tracking, rAF-throttled
    useEffect(() => {
        if (reduced) return;
        let frame = 0;
        let ev: PointerEvent | null = null;
        const flush = () => {
            frame = 0;
            const svg = svgRef.current;
            if (!svg || !ev) return;
            const r = svg.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            px.set(clamp((ev.clientX - cx) / 400));
            py.set(clamp((ev.clientY - cy) / 400));
        };
        const onMove = (e: PointerEvent) => {
            ev = e;
            if (!frame) frame = requestAnimationFrame(flush);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [reduced, px, py]);

    // idle: float, antenna sway
    useEffect(() => {
        if (reduced) return;
        const a = animate(float, [0, -5, 0], { duration: 3.2, repeat: Infinity, ease: "easeInOut" });
        return () => a.stop();
    }, [reduced, float]);

    useEffect(() => {
        if (reduced) return;
        const a = hovered
            ? animate(antennaRot, [0, -16, 14, -10, 8, 0], { duration: 0.9, repeat: Infinity })
            : animate(antennaRot, [-3, 3, -3], { duration: 3.6, repeat: Infinity, ease: "easeInOut" });
        return () => a.stop();
    }, [reduced, hovered, antennaRot]);

    // periodic blink + occasional look-around
    useEffect(() => {
        if (reduced) return;
        let t: ReturnType<typeof setTimeout>;
        const tick = () => {
            if (Math.random() < 0.3 && stateRef.current === "idle" && !hoverRef.current) {
                lookX.set((Math.random() < 0.5 ? -1 : 1) * 12);
                setTimeout(() => lookX.set(0), 1100);
            } else {
                animate(blink, [1, 0.08, 1], { duration: 0.22 });
            }
            t = setTimeout(tick, 2200 + Math.random() * 2600);
        };
        t = setTimeout(tick, 1800);
        return () => clearTimeout(t);
    }, [reduced, blink, lookX]);

    // state driven: typing / thinking
    useEffect(() => {
        typeLook.set(state === "typing" ? 1 : 0);
        thinkLook.set(state === "thinking" ? 1 : 0);
        if (reduced || state === "idle") {
            nod.set(0);
            earPulse.set(0);
            ballGlow.set(0);
            return;
        }
        const controls =
            state === "typing"
                ? [
                      animate(nod, [0, 4, 0], { duration: 0.7, repeat: Infinity, ease: "easeInOut" }),
                      animate(earPulse, [0, 1, 0], { duration: 0.9, repeat: Infinity, ease: "easeInOut" }),
                  ]
                : [animate(ballGlow, [0, 1, 0], { duration: 1.1, repeat: Infinity, ease: "easeInOut" })];
        return () => {
            for (const c of controls) c.stop();
        };
    }, [state, reduced, nod, earPulse, ballGlow, typeLook, thinkLook]);

    const handleClick = () => {
        if (reduced) return;
        animate(bounce, [0, -14, 0, -5, 0], { duration: 0.55, ease: "easeOut" });
        animate(squash, [1, 0.94, 1.04, 1], { duration: 0.55, ease: "easeOut" });
    };

    const ballGlowOpacity = useTransform(ballGlow, [0, 1], [0, 0.9]);
    const ballGlowScale = useTransform(ballGlow, [0, 1], [1, 1.5]);
    const earRingOpacity = useTransform(earPulse, [0, 1], [0.55, 1]);
    const earGlowOpacity = useTransform(earPulse, [0, 1], [0.15, 0.85]);
    const thinking = state === "thinking";

    return (
        <motion.svg
            ref={svgRef}
            role="img"
            aria-label="Franco's assistant"
            viewBox="330 300 570 600"
            width={size}
            height={size}
            className={cn("shrink-0 cursor-pointer overflow-visible", className)}
            onHoverStart={() => {
                hoverRef.current = true;
                setHovered(true);
            }}
            onHoverEnd={() => {
                hoverRef.current = false;
                setHovered(false);
            }}
            onTap={handleClick}
        >
            <defs>
                <radialGradient id="aa-shell" cx="0.55" cy="0.3" r="0.8">
                    <stop offset="0" stopColor="#fafafa" />
                    <stop offset="0.55" stopColor="#f2f1f0" />
                    <stop offset="1" stopColor="#dbd6d5" />
                </radialGradient>
                <linearGradient id="aa-shell-shade" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#e1dfde" stopOpacity="0.9" />
                    <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
                    <stop offset="1" stopColor="#cfc9c8" stopOpacity="0.6" />
                </linearGradient>
                <radialGradient id="aa-screen" cx="0.4" cy="0.25" r="0.9">
                    <stop offset="0" stopColor="#373737" />
                    <stop offset="0.6" stopColor="#282828" />
                    <stop offset="1" stopColor="#1a1a1a" />
                </radialGradient>
                <radialGradient id="aa-orange" cx="0.4" cy="0.3" r="0.8">
                    <stop offset="0" stopColor="#ffd36a" />
                    <stop offset="1" stopColor="#f0ac3a" />
                </radialGradient>
                <radialGradient id="aa-ball" cx="0.4" cy="0.3" r="0.8">
                    <stop offset="0" stopColor="#ffd56c" />
                    <stop offset="1" stopColor="#fdbf4e" />
                </radialGradient>
                <filter id="aa-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
                <clipPath id="aa-screen-clip">
                    <path d="M600 560C700 530 840 540 878 620C895 680 890 740 850 775C800 805 680 805 620 790C560 770 545 700 553 640C556 600 570 575 600 560Z" />
                </clipPath>
            </defs>

            {/* soft ground shadow */}
            <ellipse cx="640" cy="885" rx="170" ry="9" fill="#000" opacity="0.08" filter="url(#aa-glow)" />

            <motion.g
                id="agent-root"
                style={{ x: headX, y: headY, scaleY: squash, originX: 0.5, originY: 1 }}
            >
                {/* antenna */}
                <motion.g id="antenna" style={{ rotate: sAntenna, originX: 0.5, originY: 1 }}>
                    <path id="antenna-stalk" d="M619 385H631V432H619Z" fill="#ffc153" />
                    <ellipse id="antenna-base" cx="625" cy="438" rx="46" ry="17" fill="#febf4e" />
                    <motion.circle
                        id="antenna-glow"
                        cx="625"
                        cy="355"
                        r="34"
                        fill="#fdcc56"
                        filter="url(#aa-glow)"
                        style={{ opacity: ballGlowOpacity, scale: ballGlowScale, originX: 0.5, originY: 0.5 }}
                    />
                    <circle id="antenna-ball" cx="625" cy="355" r="33" fill="url(#aa-ball)" />
                </motion.g>

                {/* head (tilts toward cursor) */}
                <motion.g id="head" style={{ rotate: headRotate, originX: 0.5, originY: 0.9 }}>
                    <g id="head-shell">
                        <path
                            id="head-shell-base"
                            d="M400 560C400 485 520 450 650 452C800 455 889 520 889 650C889 780 820 881 650 881C480 881 358 840 358 700C358 640 370 590 400 560Z"
                            fill="url(#aa-shell)"
                        />
                        <path
                            id="head-shell-shade"
                            d="M400 560C400 485 520 450 650 452C800 455 889 520 889 650C889 780 820 881 650 881C480 881 358 840 358 700C358 640 370 590 400 560Z"
                            fill="url(#aa-shell-shade)"
                        />
                    </g>

                    {/* ear / side knob */}
                    <g id="ear">
                        <ellipse id="ear-body" cx="410" cy="687" rx="52" ry="90" fill="url(#aa-orange)" />
                        <motion.circle
                            id="ear-glow"
                            cx="395"
                            cy="688"
                            r="34"
                            fill="none"
                            stroke="#fdcc56"
                            strokeWidth="12"
                            filter="url(#aa-glow)"
                            style={{ opacity: earGlowOpacity }}
                        />
                        <circle id="ear-inner" cx="395" cy="688" r="30" fill="#eea83e" />
                        <motion.circle
                            id="ear-ring"
                            cx="395"
                            cy="688"
                            r="34"
                            fill="none"
                            stroke="#fdcc56"
                            strokeWidth="5"
                            style={{ opacity: earRingOpacity }}
                        />
                    </g>

                    {/* face screen */}
                    <g id="face">
                        <path
                            id="face-screen"
                            d="M600 560C700 530 840 540 878 620C895 680 890 740 850 775C800 805 680 805 620 790C560 770 545 700 553 640C556 600 570 575 600 560Z"
                            fill="url(#aa-screen)"
                        />
                        <g clipPath="url(#aa-screen-clip)">
                            <motion.g id="face-features" style={{ x: eyeX, y: eyeY }}>
                                <motion.g
                                    id="eyes"
                                    style={{ scaleY: eyesScaleY, originX: 0.5, originY: 0.5 }}
                                    animate={{ opacity: thinking ? [1, 0.35, 1] : 1 }}
                                    transition={thinking && !reduced ? { duration: 1.1, repeat: Infinity } : { duration: 0.2 }}
                                >
                                    <path
                                        id="eye-left"
                                        d="M648 686Q680 630 712 686"
                                        fill="none"
                                        stroke="#fdcc56"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        id="eye-right"
                                        d="M812 676Q836 636 858 672"
                                        fill="none"
                                        stroke="#fdcc56"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                </motion.g>
                                <motion.path
                                    id="mouth"
                                    d="M744 703Q767 712 790 703Q785 730 767 730Q749 730 744 703Z"
                                    fill="#fdc957"
                                    stroke="#fdc957"
                                    strokeWidth="4"
                                    strokeLinejoin="round"
                                    animate={{ scale: mouthScale }}
                                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                                    style={{ originX: 0.5, originY: 0.2 }}
                                />
                            </motion.g>
                        </g>
                    </g>
                </motion.g>
            </motion.g>
        </motion.svg>
    );
}
