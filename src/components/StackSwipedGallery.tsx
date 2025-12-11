import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./StackSwipeGallery.css";

type Props = {
  images: string[];
};

export default function StackSwipeGallery({ images }: Props) {
  const [cards, setCards] = useState(images);
  const [direction, setDirection] = useState(0);

  const handleSwipe = (dir: number) => {
    setDirection(dir);

    setCards((prev) => {
      const newOrder = [...prev.slice(1), prev[0]];
      return newOrder;
    });
  };

  return (
    <div className="stack-container">
      <AnimatePresence>
        {cards.slice(0, 3).reverse().map((src, i) => {
          const isTop = i === 2;

          return (
            <motion.div
              key={src}
              className={`stack-card ${isTop ? "top-card" : "back-card"}`}
              style={{
                zIndex: i + 1,
                // Horizontal offset for the premium overlapped look
                left: `${(2 - i) * 12}px`,
              }}
              initial={{
                y: 40 * (2 - i),
                scale: 1 - i * 0.06,
                opacity: i === 2 ? 1 : 0.75,
              }}
              animate={{
                y: 40 * (2 - i),
                scale: 1 - i * 0.06,
                opacity: i === 2 ? 1 : 0.75,
              }}
              exit={
                isTop
                  ? {
                    x: direction * 400,
                    rotate: direction * 25,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }
                  : {}
              }
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 120) handleSwipe(1);
                else if (info.offset.x < -120) handleSwipe(-1);
              }}
            >
              <img src={src} alt="" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
