import Lenis from "lenis";

// Single Lenis instance shared by every layout; survives view transitions.
let instance: Lenis | undefined;

export function getLenis() {
	instance ??= new Lenis({ autoRaf: true });
	return instance;
}
