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

    // 🫧 Create 3 bubbles per update instead of 1
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

    // Reset state so animation can replay
    frame.classList.remove("cleaned");
    gsap.set(dirt, { opacity: 1, filter: "blur(0px)" });
    gsap.set(sponge, { x: -40, y: 0 });

    const w = frame.offsetWidth;
    const h = frame.offsetHeight;

    // 📱 Mobile-friendly logic
    const rows = w < 500 ? 2 : 3; // fewer sweeps on phones
    const radius = h * (w < 500 ? 0.12 : 0.18);
    const margin = h * 0.15;
    const rowHeight = (h * 0.7) / rows;
    const leftX = w * 0.1;
    const rightX = w * 0.9;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(dirt, { opacity: 0, filter: "blur(6px)", duration: 0.4 });
        frame.classList.add("cleaned"); // triggers sparkles ✨
      }
    });

    for (let i = 0; i < rows; i++) {
      const yPos = margin + i * rowHeight;

      // Sweep left → right
      tl.to(sponge, {
        duration: 0.26,
        x: rightX,
        y: yPos,
        ease: "power2.inOut",
        onUpdate: spawnBubble,
      });

      // Fade dirt as we scrub
      tl.to(
        dirt,
        {
          opacity: 1 - (i + 1) / rows,
          duration: 0.22,
          ease: "none",
        },
        "<" // perfectly overlaps
      );

      // Sweep right → left
      tl.to(sponge, {
        duration: 0.26,
        x: leftX,
        y: yPos + radius * 0.05, // tiny tilt
        ease: "power2.inOut",
        onUpdate: spawnBubble,
      });
    }
  };


  return (
    <div className="ba-frame" ref={frameRef} onClick={handleClean}>
      {/* Sparkles */}
      <span className="sparkle"></span>
      <span className="sparkle"></span>
      <span className="sparkle"></span>
      <span className="sparkle"></span>

      {/* Images */}
      <img src={after} className="ba-img clean-layer" alt="After clean" />
      <img src={before} className="ba-img dirt-layer" ref={dirtRef} alt="Before dirty" />

      {/* Sponge Cleanser */}
      <div className="scrubber" ref={scrubberRef}>🧽</div>

      {/* Bubble Trail Container */}
      <div className="bubble-container" ref={bubbleContainerRef}></div>

      <p className="ba-label">{label}</p>
    </div>
  );
}
