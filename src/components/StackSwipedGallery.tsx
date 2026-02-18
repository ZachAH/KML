import { useState, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import "./StackSwipedGallery.css";

type Props = { images: string[] };

export default function StackSwipedGallery({ images }: Props) {
  const [stack, setStack] = useState(images);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Detect double tap
  const lastTapRef = useRef<number>(0);
  const DOUBLE_TAP_DELAY = 280;

  const handleDoubleTap = (img: string) => {
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      setLightbox(img);
    }
    lastTapRef.current = now;
  };

  // Shared rotate-stack logic — moves top card to back
  const rotateStack = useCallback(() => {
    setStack((prev) => {
      const next = [...prev];
      const [removed] = next.splice(0, 1);
      next.push(removed);
      return next;
    });
  }, []);

  // Rotate stack backwards — moves last card to front
  const rotateStackBack = useCallback(() => {
    setStack((prev) => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  }, []);

  // Swipe confidence
  const swipeConfidence = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity > 2200;

  const handleDragEnd = useCallback(
    (_i: number, _e: any, info: PanInfo) => {
      const { offset, velocity } = info;
      if (!swipeConfidence(offset.x, velocity.x)) return;
      rotateStack();
    },
    [rotateStack]
  );

  return (
    <div className="stack-section">
      <div className="stack-header">
        <h2 className="stack-title">Expert Cleaning In Action</h2>
        <p className="stack-instructions">
          Double tap to see the full image. Swipe right to move to the next
          photo.
        </p>

        {/* Arrow Controls */}
        <div className="stack-arrows">
          <button
            className="stack-arrow-btn"
            onClick={rotateStackBack}
            aria-label="Previous photo"
          >
            &#8592;
          </button>
          <button
            className="stack-arrow-btn"
            onClick={rotateStack}
            aria-label="Next photo"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="stack-gallery-wrapper">
        <AnimatePresence>
          {stack.map((src, i) => {
            const isTop = i === 0;
            const mvX = useMotionValue(0);

            return (
              <motion.div
                key={src}
                className="stack-card"
                style={{
                  x: mvX,
                  zIndex: stack.length - i,
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: i === 0 ? 0 : i % 2 === 0 ? -5 : 5,
                  y: i * 20,
                  transition: { type: "spring", stiffness: 140, damping: 22 },
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, info) => handleDragEnd(i, e, info)}
                onTap={() => handleDoubleTap(src)}
              >
                <motion.img
                  src={src}
                  className="stack-card-img"
                  alt=""
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {lightbox && (
          <motion.div
            className="lightbox"
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={lightbox} className="lightbox-img" />
          </motion.div>
        )}
      </div>
    </div>
  );
}