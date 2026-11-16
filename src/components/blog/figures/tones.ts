export const tones = {
	blue: "#2563eb",
	teal: "#0f766e",
	amber: "#b45309",
	violet: "#7c3aed",
	rose: "#e11d48",
	gray: "#9ca3af",
} as const;

export type Tone = keyof typeof tones;
