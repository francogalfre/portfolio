"use client";

import { motion, type MotionStyle } from "motion/react";

interface MemeProps {
  src: string;
  alt: string;
  style: MotionStyle;
}

const Meme = ({ src, alt, style }: MemeProps) => {
  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{
        delay: 10,
        duration: 8,
        ease: "easeInOut",
      }}
      src={src}
      alt={alt}
      drag
      className="absolute cursor-grab inset-0"
      style={style}
    />
  );
};

export default Meme;
