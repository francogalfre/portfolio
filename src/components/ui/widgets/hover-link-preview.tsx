import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface HoverLinkPreviewProps {
  href: string;
  previewImage: string;
  imageAlt?: string;
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
  previewWidth?: number;
  previewHeight?: number;
  children: React.ReactNode;
}

const OFFSET_Y = 24;

const HoverLinkPreview: React.FC<HoverLinkPreviewProps> = ({
  href,
  previewImage,
  imageAlt = "Link preview",
  external = true,
  className = "relative inline-block",
  style,
  previewWidth = 112,
  previewHeight = 112,
  children,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevX = useRef<number | null>(null);
  const preloaded = useRef(false);

  const motionTop = useMotionValue(0);
  const motionLeft = useMotionValue(0);
  const motionRotate = useMotionValue(0);

  const springTop = useSpring(motionTop, { stiffness: 300, damping: 30 });
  const springLeft = useSpring(motionLeft, { stiffness: 300, damping: 30 });
  const springRotate = useSpring(motionRotate, { stiffness: 300, damping: 20 });

  const preload = () => {
    if (preloaded.current) return;
    preloaded.current = true;
    new Image().src = previewImage;
  };

  useEffect(() => {
    setMounted(true);
    preload();
  }, []);

  const place = (e: React.MouseEvent) => {
    motionTop.set(e.clientY - previewHeight - OFFSET_Y);
    motionLeft.set(e.clientX - previewWidth / 2);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    preload();
    place(e);
    springTop.jump(motionTop.get());
    springLeft.jump(motionLeft.get());
    prevX.current = null;
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    prevX.current = null;
    motionRotate.set(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    place(e);
    if (prevX.current !== null) {
      const deltaX = e.clientX - prevX.current;
      motionRotate.set(Math.max(-15, Math.min(15, deltaX * 1.2)));
    }
    prevX.current = e.clientX;
  };

  return (
    <>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={className}
        style={style}
        onFocus={preload}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: springTop,
                  left: springLeft,
                  rotate: springRotate,
                  zIndex: 50,
                  pointerEvents: "none",
                }}
              >
                <div className="bg-white rounded-3xl shadow-lg p-1.5 ring-1 ring-black/5">
                  <img
                    src={previewImage}
                    alt={imageAlt}
                    draggable={false}
                    width={previewWidth}
                    height={previewHeight}
                    style={{ width: previewWidth, height: previewHeight }}
                    className="object-cover rounded-[20px] bg-gray-100"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export { HoverLinkPreview };
