import { useEffect, useRef, useState } from "react";
import "./BeforeAfterImage.css";

interface Props {
  before: string;
  after: string;
  label?: string;

  // 0 = all before
  // 50 = half
  // 100 = all after
  initial?: number;

  // show the “Drag to compare →” hint?
  showHint?: boolean;

  // how long the handle glows on load (ms)
  glowDurationMs?: number;
}

export default function BeforeAfterImage({
  before,
  after,
  label,
  initial = 0,
  showHint = true,
  glowDurationMs = 3000,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const [pct, setPct] = useState(() => clamp(initial, 0, 100));
  const [hintDismissed, setHintDismissed] = useState(false);

  // ✅ handle glow for first few seconds (auto-stops + stops on interaction)
  const [showHandleGlow, setShowHandleGlow] = useState(true);

  const maskStyle = { width: `${pct}%` };
  const lineStyle = { left: `${pct}%` };

  // Auto-stop glow after N ms
  useEffect(() => {
    const t = window.setTimeout(() => setShowHandleGlow(false), glowDurationMs);
    return () => window.clearTimeout(t);
  }, [glowDurationMs]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateFromClientX = (clientX: number) => {
      const rect = frame.getBoundingClientRect();
      const x = clientX - rect.left;
      const nextPct = (x / rect.width) * 100;
      setPct(clamp(nextPct, 0, 100));
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };

    const stopDragging = () => {
      draggingRef.current = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, []);

  const dismissHint = () => {
    if (!hintDismissed) setHintDismissed(true);
    if (showHandleGlow) setShowHandleGlow(false);
  };

  const jumpTo = (e: React.PointerEvent) => {
    dismissHint();

    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setPct(clamp((x / rect.width) * 100, 0, 100));
  };

  const startDrag = (e: React.PointerEvent) => {
    dismissHint();

    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setPct(clamp((x / rect.width) * 100, 0, 100));
  };

  return (
    <div>
      <div
        className="ba-frame"
        ref={frameRef}
        onPointerDown={jumpTo}
        role="group"
        aria-label="Before and after image comparison"
      >
        <div className="ba-images">
          <img src={before} className="ba-img ba-before" alt="Before" />

          <div className="ba-mask" style={maskStyle}>
            <img src={after} className="ba-img ba-after" alt="After" />
          </div>

          {/* <div className="ba-tags">
            <span className="ba-tag">Before</span>
            <span className="ba-tag">After</span>
          </div> */}

          {/* Divider line */}
          <div className="ba-divider" style={lineStyle} />

          {/* Draggable handle (with temporary glow) */}
          <div
            className={`ba-handle ${showHandleGlow ? "ba-handle--hint" : ""}`}
            style={lineStyle}
            onPointerDown={(e) => {
              e.stopPropagation();
              startDrag(e);
            }}
            aria-label="Drag to compare"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            tabIndex={0}
            onFocus={dismissHint}
            onKeyDown={(e) => {
              dismissHint();
              if (e.key === "ArrowLeft") setPct((p) => clamp(p - 2, 0, 100));
              if (e.key === "ArrowRight") setPct((p) => clamp(p + 2, 0, 100));
              if (e.key === "Home") setPct(0);
              if (e.key === "End") setPct(100);
            }}
          />

          {/* Drag hint */}
          {showHint && (
            <div className={`ba-hint ${hintDismissed ? "ba-hint--hide" : ""}`}>
              Drag to compare →
            </div>
          )}
        </div>
      </div>

      {label ? <div className="ba-label">{label}</div> : null}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
