import type { ReactNode } from "react";
import { motion } from "motion/react";

interface MotionSectionProps {
  id?: string;
  style?: string;
  children: ReactNode;
}

export default function MotionSection({
  id,
  style,
  children,
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50, scale: 0.975 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
        default: { type: "spring" },
        opacity: { type: "tween", duration: 1 },
      }}
      id={id}
      className={`scroll-m-20 w-full mx-auto container lg:max-w-3xl md:max-w-2xl ${style}`}
    >
      {children}
    </motion.section>
  );
}
