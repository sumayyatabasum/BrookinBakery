import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const categories = [
  { img: "/src/assets/pop-1.png", name: "Brownies", items: 3 },
  { img: "/src/assets/pop-2.png", name: "Cookies", items: 6 },
  { img: "/src/assets/pop-3.png", name: "Cakes", items: 13 },
];

function PopCard({
  img,
  name,
  items,
}: {
  img: string;
  name: string;
  items: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="pop-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pop-img-wrap">
        <img
          src={img}
          alt={name}
          className="pop-img"
          style={{ transform: hovered ? "scale(1.12)" : "scale(1.0)" }}
        />
      </div>

      <div className="pop-footer">
        <div className="pop-info">
          <p className="pop-name">{name}</p>
          <p className="pop-count">{items} items</p>
        </div>
        <button
          className="pop-arrow"
          style={{
            background: hovered ? "#1a1a1a" : "#efefef",
            color: hovered ? "#fff" : "#1a1a1a",
          }}
          aria-label={`Shop ${name}`}
        >
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function BestSellers() {
  return (
    <>
      <style>{`
        .pop-section {
          background: #ffd1dc;
          padding: 70px 56px;
          font-family: 'Lato', sans-serif;
        }

        .pop-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: end;
          gap: 56px;
        }

        .pop-text {
          flex-shrink: 0;
          width: 210px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-self: flex-start;
        }

        .pop-label {
          font-size: 14px;
          font-weight: 700;
          color: #2a1015;
          margin: 0;
        }

        .pop-heading {
          font-size: 2.3rem;
          font-weight: 900;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.1;
          font-family: 'Lato', sans-serif;
        }

        .pop-sub {
          font-size: 14px;
          font-weight: 600;
          color: #2a1015;
          margin: 0;
          line-height: 1.5;
        }

        .pop-cards {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 820px;
        }

        .pop-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .pop-img-wrap {
          width: 100%;
          padding-top: 100%;
          position: relative;
          overflow: hidden;
        }

        .pop-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 1.1s ease;
        }

        .pop-footer {
          background: #fff;
          padding: 16px 18px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pop-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pop-name {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .pop-count {
          font-size: 14px;
          color: #999;
          margin: 0;
          font-weight: 400;
        }

        .pop-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s ease, color 0.25s ease;
        }

        @media (max-width: 900px) {
          .pop-inner       { flex-direction: column; align-items: flex-start; gap: 32px; }
          .pop-text        { width: 100%; }
          .pop-section     { padding: 48px 24px; }
        }
        @media (max-width: 600px) {
          .pop-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="pop-section">
        <div className="pop-inner">
          <div className="pop-text">
            <p className="pop-label">What's Popular Now</p>
            <h2 className="pop-heading">Best Sellers</h2>
            <p className="pop-sub">Shop our most loved products.</p>
          </div>

          <div className="pop-cards">
            {categories.map((cat) => (
              <PopCard key={cat.name} {...cat} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
