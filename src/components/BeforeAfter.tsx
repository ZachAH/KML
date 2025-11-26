import BeforeAfterImage from "./BeforeAfterImage";

import dirty_bathroom from "../assets/cleaning/before-after/dirty_bathroom.webp";
import clean_bathroom from "../assets/cleaning/before-after/clean_bathroom.webp";

import dirty_livingroom from "../assets/cleaning/before-after/dirty_livingroom.webp";
import clean_livingroom from "../assets/cleaning/before-after/clean_livingroom.webp";

import dirty_office from "../assets/cleaning/before-after/dirty_office.webp";
import clean_office from "../assets/cleaning/before-after/clean_office.webp";

export default function BeforeAfter() {
  return (
    <section className="before-after-section">
      <h2 className="before-after-title">Before & After Results</h2>

      <div className="before-after-cards">
        <BeforeAfterImage
          before={dirty_bathroom}
          after={clean_bathroom}
          label="Bathroom Deep Clean"
        />
        <BeforeAfterImage
          before={dirty_livingroom}
          after={clean_livingroom}
          label="Living Room Refresh"
        />
        <BeforeAfterImage
          before={dirty_office}
          after={clean_office}
          label="Office Revitalized"
        />
      </div>
    </section>
  );
}

