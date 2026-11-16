export const tones = {
	blue: "var(--tone-blue, #2563eb)",
	teal: "var(--tone-teal, #0f766e)",
	amber: "var(--tone-amber, #b45309)",
	violet: "var(--tone-violet, #7c3aed)",
	rose: "var(--tone-rose, #e11d48)",
	gray: "var(--tone-gray, #9ca3af)",
} as const;

export type Tone = keyof typeof tones;
