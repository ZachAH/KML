import { useEffect, useMemo, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";
import Stars from "../components/Stars";

// Register ScrollTrigger plugin for the waterfall entrance
gsap.registerPlugin(ScrollTrigger);

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Katie Oberbeck Nagorny",
    rating: 5,
    text:
      "Not only are the prices reasonable, but they were able to get the carpets cleaned in a timely manner despite issues coming up. They cleaned a rental room along with our bedrooms, hallway, and stairs. Even with the damage the tenant caused, they got the rental room back to looking great — and the rest looks like we had new carpeting installed. You guys are a lifesaver!",
  },
  {
    id: 2,
    name: "Heidi Fellenz",
    rating: 5,
    text:
      "They do such great work! The tile/grout cleaning has our floors looking brand new. The team is professional, courteous, and timely — hands down the best floor cleaners we’ve ever used.",
  },
  {
    id: 3,
    name: "Wendy Dondlinger",
    rating: 5,
    text:
      "We hired them to clean my dad’s carpet and couldn’t be more pleased. The gentleman who answers the phone is respectful and answered all our questions. The team that came to clean was pleasant and very professional. The carpet looks brand new. Thank you for the BEST service — you always exceed our expectations.",
  },
  {
    id: 4,
    name: "Karen Wallner",
    rating: 5,
    text:
      "Prompt, professional, friendly, and careful not to bump woodwork. They did a beautiful job and the price was very reasonable. I’ll have them come every 6 months!",
  },
  {
    id: 5,
    name: "James Cramer",
    rating: 5,
    text:
      "We’re very pleased with our carpet cleaning experience with Kettle Moraine. This was the fourth time they’ve been at our house and the crew does an excellent job. We’ve recommended them to neighbors and friends.",
  },
  {
    id: 6,
    name: "Patricia Ladwig",
    rating: 5,
    text:
      "We are so pleased with the work that was done. I appreciate that you fit us in so quickly and the results were amazing. The young man cleaning found my mom’s diamond ring under the bed and immediately returned it — we were so grateful for his honesty and integrity. Getting our parents’ home ready to sell has been stressful, but your company and workers were nothing less than amazing. Years of wear came out of the carpet and even the grout in the bathroom tile looks incredible. A+++ service at a fair price — I’d recommend you to anyone!",
  },
  {
    id: 7,
    name: "Christine McDiarmid",
    rating: 5,
    text:
      "Nicole and Brandon did an excellent job cleaning our carpet, wool rugs, stairs, and chair. They were friendly to our dog, efficient, courteous, and professional. We will always choose Kettle Moraine Professional Cleaners for our deep cleaning needs.",
  },
  {
    id: 8,
    name: "Sheryl Toennes",
    rating: 5,
    text:
      "Very professional and did an awesome job. Carpets look fantastic and they removed stains that our dogs’ feet transferred to the stairs. Gave clear instructions on how to care for the carpet while it was drying. Won't hesitate to use them again.",
  },
  {
    id: 9,
    name: "Andrea Frodermann",
    rating: 5,
    text:
      "Amazing job. I was so pleased I was texting and calling girlfriends for two days. Great communication (confirmation text, prep email, payment options), and the team was polite, respectful, and careful in my home — drop cloths, shoe covers, everything. I appreciated that I wasn’t upsold something I didn't need. The price was more than reasonable. I was very comfortable with Robert and Nicole in my home. My carpets look fantastic and I could not be more pleased. I cannot rate these folks highly enough.",
  },
];

const NEEDS_TOGGLE_CHARS = 260;
const MOBILE_MAX_WIDTH = 620;

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_MAX_WIDTH : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleReviews = useMemo(() => {
    const base = isMobile ? reviews.slice(0, 2) : reviews.slice(0, 6);
    return showAll ? reviews : base;
  }, [showAll, isMobile]);

  const toggleExpanded = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // GSAP Waterfall Cascade Logic
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".testimonial-card");

      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          rotationX: -6,
          transformPerspective: 2000,
          stagger: 0.1,
          duration: 0.8,
          ease: "expo.out",
          clearProps: "all",
          force3D: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleReviews]);

  return (
    <section className="testimonials" id="reviews" ref={sectionRef}>
      <div className="testimonials-inner">
        <p className="testimonials-eyebrow">REVIEWS</p>
        <h2 className="testimonials-title">Trusted by Homes & Businesses</h2>
        <p className="testimonials-subtitle">
          Real feedback from customers who count on us for cleaner spaces and results they can feel.
        </p>

        <div className="testimonials-grid" ref={gridRef}>
          {visibleReviews.map(review => {
            const isLong = review.text.length > NEEDS_TOGGLE_CHARS;
            const isExpanded = !!expanded[review.id];

            return (
              <article className="testimonial-card" key={review.id}>
                <Stars rating={review.rating} />
                <p className={`testimonial-text ${!isExpanded ? "clamped" : ""}`}>
                  “{review.text}”
                </p>
                {isLong && (
                  <button 
                    type="button" 
                    className="testimonial-toggle" 
                    onClick={() => toggleExpanded(review.id)}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
                <div className="testimonial-meta">
                  <span className="testimonial-name">{review.name}</span>
                </div>
              </article>
            );
          })}
        </div>

        {reviews.length > (isMobile ? 2 : 6) && (
          <div className="testimonials-actions">
            <button 
              className="testimonials-btn" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show fewer reviews" : "Show all reviews"}
            </button>
          </div>
        )}
      </div>

      {/* 🌊 Bottom Transition Divider: Flowing Green back into White for Services */}
      <div className="section-divider divider-bottom">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path
          d = "M0,120V20C200,80,400,0,600,40,800,80,1000,20,1200,60V120H0Z"
          fill="#01351d"  /* 🔑 Matches the bottom of the section gradient */
          />
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;