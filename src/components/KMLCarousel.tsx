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

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "precision",
    rubberband: true,
    dragSpeed: 0.75,
    mode: "free-snap",

    /* ✔ The correct v6 animation control */
    defaultAnimation: {
      duration: 550,
    },

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

      let autoplayTimer: any;

      const start = () => {
        autoplayTimer = setTimeout(() => {
          slider.current?.next();
          start();
        }, 4500);
      };

      const clear = () => clearTimeout(autoplayTimer);

      start();

      sl.on("dragStarted", clear);
      sl.on("dragEnded", start);

      sl.container.addEventListener("mouseover", clear);
      sl.container.addEventListener("mouseout", start);
    },
  });


  // Lightbox swipe close
  useEffect(() => {
    if (!lightbox) return;

    const handler = () => setLightbox(null);
    window.addEventListener("touchstart", handler);
    return () => window.removeEventListener("touchstart", handler);
  }, [lightbox]);

  return (
    <>
      <div className="kml-carousel-wrapper">
        {/* Desktop arrows only */}
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

        {/* SOFT EDGE GRADIENTS */}
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
