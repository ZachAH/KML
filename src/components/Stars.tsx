import React from "react";

type StarsProps = { rating: number };

const Stars: React.FC<StarsProps> = ({ rating }) => {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default Stars;