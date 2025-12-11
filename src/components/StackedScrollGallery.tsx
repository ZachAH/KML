import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./StackedScrollGallery.css";

type Props = {
  images: string[];
};

export default function StackedScrollGallery({ images }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="stack-gallery-wrapper" ref={containerRef}>
      {images.map((src, i) => {
        const total = images.length;

        // smoother reveal window
        const start = i * (1 / total);
        const end = start + 0.35;

        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

        const y = useTransform(scrollYProgress, [start, end], [80, 0]);

        const scale = useTransform(scrollYProgress, [start, end], [0.88, 1]);

        return (
          <motion.div
            key={i}
            className="stack-gallery-card"
            style={{
              opacity,
              y,
              scale,
              zIndex: i + 1,
            }}
          >
            <img src={src} alt="" loading="lazy" />
          </motion.div>
        );
      })}
    </div>
  );
}
