import { useState } from "react";

const cards = [
  { img: "/src/assets/fav-1.png", label: "ONLINE BAKING CLASSES" },
  { img: "/src/assets/fav-2.png", label: "RECIPES" },
  { img: "/src/assets/fav-3.png", label: "BUILD A BAKERY (COURSE)" },
];

export default function FavouriteCookies() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .fav-section {
          padding: 72px 0 0;
          font-family: 'Lato', sans-serif;
        }

        .fav-top {
          padding: 0 40px;
        }

        /* ── Heading + button ── */
        .fav-top {
          text-align: center;
          margin-bottom: 48px;
        }

        .fav-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 24px;
          letter-spacing: -0.01em;
        }

        .fav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          padding: 14px 32px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          transition: background 0.2s ease;
        }
        .fav-btn:hover { background: #3d2b1f; }

        /* ── Cards grid ── */
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          width: 100%;
          padding: 0 40px;
          box-sizing: border-box;
        }

        /* Single card */
        .fav-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 3/4;
          border-radius: 20px;
        }

        .fav-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 1s ease;
          transform: scale(1.0);
        }
        .fav-card:hover img {
          transform: scale(1.07);
        }

        /* Dark gradient at bottom */
        .fav-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.52) 0%,
            transparent 45%
          );
          pointer-events: none;
        }

        /* Label pill at bottom center */
        .fav-label {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          background: #1a1a1a;
          color: #fff;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 24px;
          white-space: nowrap;
          font-family: 'Lato', sans-serif;
          transition: background 0.2s ease;
        }
        .fav-card:hover .fav-label {
          background: #3d2b1f;
        }

        @media (max-width: 768px) {
          .fav-grid { grid-template-columns: 1fr; }
          .fav-section { padding: 48px 0 0; }
        }
      `}</style>

      <section className="fav-section">
        {/* Heading + button */}
        <div className="fav-top">
          <h2 className="fav-title">The internet's favourite cookies.</h2>
          <button className="fav-btn">Shop Now</button>
        </div>

        {/* 3 image cards */}
        <div className="fav-grid">
          {cards.map((card, i) => (
            <div
              key={i}
              className="fav-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={card.img} alt={card.label} draggable={false} />
              <span className="fav-label">{card.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
