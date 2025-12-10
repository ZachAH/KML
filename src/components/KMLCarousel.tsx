import { useKeenSlider } from "keen-slider/react";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState, useRef } from "react";
import "./KMLCarousel.css";

type Props = {
  images: string[];
};

const KMLCarousel: React.FC<Props> = ({ images }) => {
  const middleIndex = Math.floor(images.length / 2);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(middleIndex);

  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

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

      sl.container
        .querySelectorAll(".kml-coverflow-card")
        .forEach((slide) => slide.classList.remove("is-active"));

      const active = sl.slides[rel];
      active?.classList.add("is-active");
    },

    created(sl) {
      const active = sl.slides[sl.track.details.rel];
      active?.classList.add("is-active");

      let timeout: any;

      const startAutoplay = () => {
        timeout = setTimeout(() => {
          slider.current?.next();
          startAutoplay();
        }, 4500);
      };

      const pauseAutoplay = () => clearTimeout(timeout);

      startAutoplay();

      const interactiveEvents = ["mousedown", "touchstart", "touchmove"];
      interactiveEvents.forEach((ev) => {
        sl.container.addEventListener(ev, () => {
          pauseAutoplay();
          startAutoplay();
        });
      });

      sl.container.addEventListener("mouseover", pauseAutoplay);
      sl.container.addEventListener("mouseout", startAutoplay);
    },
  });

  // Lightbox swipe to close
  useEffect(() => {
    if (!lightbox) return;

    const handler = (e: TouchEvent) => {
      setLightbox(null);
    };

    window.addEventListener("touchstart", handler);
    return () => window.removeEventListener("touchstart", handler);
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

        {/* DOT INDICATORS */}
        <div className="kml-dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`kml-dot ${currentSlide === i ? "active" : ""}`}
              onClick={() => slider.current?.moveToIdx(i)}
            ></div>
          ))}
        </div>

        <div className="kml-fade-left"></div>
        <div className="kml-fade-right"></div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="kml-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} className="kml-lightbox-img" />
        </div>
      )}
    </>
  );
};

export default KMLCarousel;
