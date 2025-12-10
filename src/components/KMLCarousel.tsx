import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import "./KMLCarousel.css";

type Props = {
  images: string[];
};

const KMLCarousel: React.FC<Props> = ({ images }) => {
  const middleIndex = Math.floor(images.length / 2);

  const [lightbox, setLightbox] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(middleIndex);

  // MAIN SLIDER INSTANCE
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    rubberband: true,
    dragSpeed: 0.9,
    mode: "free-snap",

    slides: {
      perView: window.innerWidth < 768 ? 1.2 : 3,
      spacing: window.innerWidth < 768 ? 12 : 24,
      origin: "center",
    },

    initial: middleIndex,

    slideChanged(sl) {
      const rel = sl.track.details.rel;
      setCurrentSlide(rel);

      // remove card highlight
      sl.container
        .querySelectorAll(".kml-coverflow-card")
        .forEach((slide) => slide.classList.remove("is-active"));

      // add highlight to active
      const active = sl.slides[rel];
      active?.classList.add("is-active");
    },

    created(sl) {
      // highlight initial card
      const active = sl.slides[sl.track.details.rel];
      active?.classList.add("is-active");

      // =====================================
      // FIXED AUTO-PLAY LOGIC
      // =====================================
      let timeout: any;
      let mouseOver = false;
      let dragging = false;

      const clear = () => clearTimeout(timeout);

      const next = () => {
        if (!mouseOver && !dragging) {
          slider.current?.next();
        }
        start(); // loop again
      };

      const start = () => {
        clear();
        timeout = setTimeout(next, 4500);
      };

      // mouse events
      sl.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clear();
      });

      sl.container.addEventListener("mouseout", () => {
        mouseOver = false;
        start();
      });

      // drag events
      sl.on("dragStarted", () => {
        dragging = true;
        clear();
      });

      sl.on("dragEnded", () => {
        dragging = false;
        start();
      });

      start(); // fire first cycle
    },
  });

  // SWIPE ANYWHERE ON LIGHTBOX TO CLOSE
  useEffect(() => {
    if (!lightbox) return;

    const close = () => setLightbox(null);

    window.addEventListener("touchstart", close);
    return () => window.removeEventListener("touchstart", close);
  }, [lightbox]);

  return (
    <>
      <div className="kml-carousel-wrapper">
        {/* DESKTOP ARROWS ONLY */}
        <button
          className="kml-arrow kml-arrow-left"
          onClick={() => slider.current?.prev()}
        >
          ‹
        </button>

        <div ref={ref} className="keen-slider kml-coverflow-slider">
          {images.map((src, i) => (
            <div
              key={i}
              className="keen-slider__slide kml-coverflow-card"
              onClick={() => setLightbox(src)}
            >
              <div className="kml-card-reflection-container">
                <img src={src} alt="" loading="lazy" />

                <div
                  className="kml-reflection"
                  style={{ backgroundImage: `url(${src})` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="kml-arrow kml-arrow-right"
          onClick={() => slider.current?.next()}
        >
          ›
        </button>

        {/* DOTS */}
        <div className="kml-dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`kml-dot ${currentSlide === i ? "active" : ""}`}
              onClick={() => slider.current?.moveToIdx(i)}
            ></div>
          ))}
        </div>

        {/* EDGE FADES */}
        <div className="kml-fade-left"></div>
        <div className="kml-fade-right"></div>
      </div>

      {lightbox && (
        <div className="kml-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} className="kml-lightbox-img" />
        </div>
      )}
    </>
  );
};

export default KMLCarousel;
