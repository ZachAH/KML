import { useRef } from "react";
import gsap from "gsap";
import "./BeforeAfterImage.css";

interface Props {
  before: string;
  after: string;
  label: string;
}

export default function BeforeAfterImage({ before, after, label }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dirtRef = useRef<HTMLImageElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);

  const spawnBubble = () => {
    if (!bubbleContainerRef.current || !scrubberRef.current || !frameRef.current) return;

    const scrubberBounds = scrubberRef.current.getBoundingClientRect();
    const frameBounds = frameRef.current.getBoundingClientRect();

    const startX = scrubberBounds.left - frameBounds.left + scrubberBounds.width / 2;
    const startY = scrubberBounds.top - frameBounds.top + scrubberBounds.height / 2;

    for (let i = 0; i < 3; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubbleContainerRef.current.appendChild(bubble);

      gsap.fromTo(
        bubble,
        {
          x: startX + (Math.random() * 28 - 14),
          y: startY + (Math.random() * 28 - 14),
          scale: Math.random() * 0.4 + 0.3,
          opacity: 1,
        },
        {
          y: startY - 30 - Math.random() * 20,
          x: startX + (Math.random() * 40 - 20),
          scale: Math.random() * 0.7 + 0.4,
          opacity: 0,
          duration: 0.8,
          ease: "power1.out",
          onComplete: () => bubble.remove(),
        }
      );
    }
  };

  const handleClean = () => {
    const dirt = dirtRef.current;
    const sponge = scrubberRef.current;
    const frame = frameRef.current;

    if (!dirt || !sponge || !frame) return;

    frame.classList.remove("cleaned");

    gsap.set(dirt, { opacity: 1, filter: "blur(0px)" });

    // 🧽 Make sponge visible only during animation
    gsap.set(sponge, { opacity: 1 });

    const w = frame.offsetWidth;
    const h = frame.offsetHeight;

    const isMobile = w < 600;

    const rows = isMobile ? 2 : 3;
    const margin = h * 0.15;
    const rowHeight = (h * 0.7) / rows;

    // 🧼 Mobile = MUCH further across the frame
    const leftX = isMobile ? w * 0.02 : w * 0.1;
    const rightX = isMobile ? w * 1.05 : w * 0.9;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(dirt, { opacity: 0, filter: "blur(6px)", duration: 0.4 });
        gsap.to(sponge, { opacity: 0, duration: 0.3 }); // fade out when done
        frame.classList.add("cleaned");
      },
    });

    for (let i = 0; i < rows; i++) {
      const yPos = margin + i * rowHeight;

      tl.to(sponge, {
        duration: 0.32,
        x: rightX,
        y: yPos,
        ease: "power2.inOut",
        onUpdate: spawnBubble,
      });

      tl.to(
        dirt,
        {
          opacity: 1 - (i + 1) / rows,
          duration: 0.26,
          ease: "none",
        },
        "<"
      );

      tl.to(sponge, {
        duration: 0.32,
        x: leftX,
        y: yPos + 10,
        ease: "power2.inOut",
        onUpdate: spawnBubble,
      });
    }
  };

  return (
    <div className="ba-frame" ref={frameRef} onClick={handleClean}>
      <span className="sparkle"></span>
      <span className="sparkle"></span>
      <span className="sparkle"></span>
      <span className="sparkle"></span>

      <img src={after} className="ba-img clean-layer" alt="After clean" />
      <img src={before} className="ba-img dirt-layer" ref={dirtRef} alt="Before dirty" />

      {/* 🧽 Sponge appears only on clean interaction */}
      <div className="scrubber" ref={scrubberRef}>🧽</div>

      <div className="bubble-container" ref={bubbleContainerRef}></div>

      <p className="ba-label">{label}</p>
    </div>
  );
}
