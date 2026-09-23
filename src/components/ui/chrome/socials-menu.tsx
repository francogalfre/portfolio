import {
	Cancel01Icon,
	Github01Icon,
	Linkedin01Icon,
	Mail01Icon,
	NewTwitterIcon,
	Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const socials = [
	{
		name: "GitHub",
		href: "https://github.com/francogalfre",
		icon: Github01Icon,
	},
	{
		name: "LinkedIn",
		href: "https://linkedin.com/in/francogalfre",
		icon: Linkedin01Icon,
	},
	{
		name: "Twitter",
		href: "https://x.com/francogalfredev",
		icon: NewTwitterIcon,
	},
	{
		name: "Email",
		href: "mailto:francogalfre.work@gmail.com",
		icon: Mail01Icon,
	},
];

export function SocialsMenu() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	return (
		<div ref={ref} className="relative md:hidden">
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="absolute right-0 bottom-full mb-2.5 flex flex-col items-center gap-2"
					>
						{socials.map((social, index) => (
							<motion.a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.name}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.03 }}
								className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-secondary transition-all duration-300 hover:scale-105 hover:text-primary active:scale-95"
							>
								<HugeiconsIcon icon={social.icon} size={17} />
							</motion.a>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-label={open ? "Close social links" : "Open social links"}
				aria-expanded={open}
				className="flex items-center justify-center rounded-full bg-gray-100 p-3 text-secondary transition-all duration-300 hover:scale-105 hover:text-primary active:scale-95"
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={open ? "close" : "open"}
						initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
						animate={{ opacity: 1, rotate: 0, scale: 1 }}
						exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="flex items-center justify-center"
					>
						<HugeiconsIcon icon={open ? Cancel01Icon : Share08Icon} size={18} />
					</motion.span>
				</AnimatePresence>
			</button>
		</div>
	);
}
