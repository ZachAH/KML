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

  // Swipe confidence
  const swipeConfidence = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity > 2200;

  const handleDragEnd = useCallback(
    (i: number, _e: any, info: PanInfo) => {
      const { offset, velocity } = info;

      if (!swipeConfidence(offset.x, velocity.x)) return;

      // Move dragged card to back
      const newStack = [...stack];
      const [removed] = newStack.splice(i, 1);
      newStack.push(removed);
      setStack(newStack);
    },
    [stack]
  );

  return (
    <div className="stack-section">
        <h2 className="stack-title">Recent Cleaning Projects</h2>
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
                exit={{
                  opacity: 0,
                  scale: 0.85,
                }}
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
