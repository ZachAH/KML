import BeforeAfterImage from "./BeforeAfterImage";

import dirty_bathroom from "../assets/cleaning/before-after/dirty_bathroom.webp";
import clean_bathroom from "../assets/cleaning/before-after/clean_bathroom.webp";

import dirty_livingroom from "../assets/cleaning/before-after/dirty_livingroom.webp";
import clean_livingroom from "../assets/cleaning/before-after/clean_livingroom.webp";

// import dirty_office from "../assets/cleaning/before-after/dirty_office.webp";
// import clean_office from "../assets/cleaning/before-after/clean_office.webp";

export default function BeforeAfter() {
  return (
    <section className="before-after-section">

      {/* ✅ Single header at PAGE TOP */}
      <div
        style={{
          color: 'rgba(233, 233, 233, 0.9)',
          padding: '0.75rem 1.5rem',
          textAlign: 'center' as const,
          fontSize: '1rem',
          fontWeight: '500',
          marginBottom: '1.5rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative' as const,
        }}
      >
        New images added frequently ✨

        {/* ✅ INLINE PULSING UNDERLINE */}
        <div
          style={{
            position: 'absolute' as const,
            bottom: '-6px',
            left: '50%',
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(11, 185, 110, 0.8) 50%, transparent 100%)',
            borderRadius: '2px',
            transform: 'translateX(-50%)',
            animation: 'inlinePulse 2s ease-in-out infinite',
            filter: 'blur(0.5px)',
          }}
        />
      </div>

      <div className="before-after-cards">
        <BeforeAfterImage
          before={dirty_bathroom}
          after={clean_bathroom}
          label="Public Restroom Deep Clean"
          initial={2}
        />
        <BeforeAfterImage
          before={dirty_livingroom}
          after={clean_livingroom}
          label="Living Room Refresh"
          initial={2}

        />
        {/* <BeforeAfterImage
          before={dirty_office}
          after={clean_office}
          label="Office Revitalized"
          initial={2}

        /> */}
      </div>
    </section>
  );
}

