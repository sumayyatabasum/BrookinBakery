import { useState } from "react";
import { Gift, Truck, Star, Recycle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useQuickView } from "../context/QuickViewContext";
const badges = [
  { icon: <Gift size={15} />, label: "Customisable" },
  { icon: <Truck size={15} />, label: "Express Delivery" },
  { icon: <Star size={15} />, label: "Verified Reviews" },
  { icon: <Recycle size={15} />, label: "Recyclable Packaging" },
];

const merch = [
  {
    name: "Bake With Brooki Cookbook",
    price: "$50.00",
    img: "/src/assets/merch/merch-1.png",
    hoverImg: "/src/assets/merch/mer-1.png",
    badge: "BEST SELLER",
  },
  {
    name: "Brooki Cap",
    price: "$45.00",
    img: "/src/assets/merch/merch-2.png",
    hoverImg: "/src/assets/merch/mer-2.png",
  },
  {
    name: "Brooki Tote bag",
    price: "$35.00",
    img: "/src/assets/merch/merch-3.png",
    hoverImg: "/src/assets/merch/mer-3.png",
    badge: "BEST SELLER",
  },
  {
    name: "Oven Mitt",
    price: "$30.00",
    img: "/src/assets/merch/merch-4.png",
    hoverImg: "/src/assets/merch/mer-4.png",
  },
];

function MerchCard({
  name,
  price,
  img,
  hoverImg,
  badge,
}: {
  name: string;
  price: string;
  img: string;
  hoverImg: string;
  badge?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const { open } = useQuickView();

  return (
    <div
      className="merch-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="merch-img-wrap">
        <img
          src={img}
          alt={name}
          className="merch-img"
          style={{ opacity: hovered ? 0 : 1 }}
          draggable={false}
        />
        <img
          src={hoverImg}
          alt={name}
          className={`merch-img merch-hover-img${hovered ? " zooming" : ""}`}
          style={{ opacity: hovered ? 1 : 0 }}
          draggable={false}
        />
        {badge && (
          <div className="merch-badge">
            <span>{badge}</span>
          </div>
        )}

        <div className="merch-overlay">
          <button
            className="merch-overlay-btn"
            onClick={() =>
              addToCart({
                id: name,
                name,
                price: parseFloat(price.replace(/[^0-9.]/g, "")),
                img,
              })
            }
          >
            Add to Cart
          </button>
          <button className="merch-overlay-icon" aria-label="Quick view">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              onClick={() =>
                open({ id: name, name, price, img, hoverImg, badge })
              }
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>
      <div className="merch-info">
        <p className="merch-name">{name}</p>
        <p className="merch-price">{price}</p>
      </div>
    </div>
  );
}

export default function MerchSection() {
  return (
    <>
      <style>{`
        .merch-section {
          background: #fff;
          font-family: 'Lato', sans-serif;
          padding-bottom: 72px;
        }

        .merch-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 28px 24px;
          flex-wrap: wrap;
        }

        .merch-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #ffd1dc;
          color: #7b2d3e;
          border-radius: 9999px;
          padding: 9px 18px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          transition: background 0.25s ease, color 0.25s ease;
          cursor: pointer;
        }
        .merch-badge-pill:hover {
          background: #7b2d3e;
          color: #fff;
        }

        .merch-hero {
          text-align: center;
          padding: 12px 24px 36px;
        }

        .merch-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
        }

        .merch-shop-link {
          display: inline-block;
          font-size: 13.5px;
          font-weight: 500;
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1.5px solid #1a1a1a;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .merch-shop-link:hover { opacity: 0.6; }

        .merch-grid-wrap {
          padding: 0 40px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .merch-label {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 20px;
        }

        .merch-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .merch-card {
          cursor: pointer;
          border-radius: 14px;
          overflow: hidden;
          background: #f7f4f2;
          display: flex;
          flex-direction: column;
        }

        .merch-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 115%;
          overflow: hidden;
          border-radius: 14px 14px 0 0;
          background: #f0eae8;
        }

        .merch-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity 0.4s ease;
        }

        .merch-hover-img {
          z-index: 2;
          transform: scale(1.08);
        }
        .merch-hover-img.zooming {
          animation: merchZoomIn 1s ease forwards;
        }
        @keyframes merchZoomIn {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }

        .merch-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          background: #2a1710;
          color: #fff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .merch-badge span {
          font-size: 7.5px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .merch-info {
          padding: 14px 14px 18px;
          background: #faf9f8;
          flex: 1;
        }

        .merch-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 6px;
        }

        .merch-price {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .merch-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: linear-gradient(to top, rgba(0,0,0,0.13) 0%, transparent 55%);
        }
        .merch-card:hover .merch-overlay {
          opacity: 1;
          pointer-events: all;
        }

        .merch-overlay-btn {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.4s ease;
          background: #fff;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 20px;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          white-space: nowrap;
        }
        .merch-card:hover .merch-overlay-btn {
          transform: translateX(-50%) translateY(0px);
          opacity: 1;
        }
        .merch-overlay-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .merch-overlay-icon {
          position: absolute;
          top: 10px;
          right: -40px;
          opacity: 0;
          transition: right 0.4s ease, opacity 0.4s ease;
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a1a1a;
        }
        .merch-card:hover .merch-overlay-icon {
          right: 10px;
          opacity: 1;
        }
        .merch-overlay-icon:hover {
          background: #1a1a1a;
          color: #fff;
        }

        @media (max-width: 900px) {
          .merch-grid { grid-template-columns: repeat(2, 1fr); }
          .merch-grid-wrap { padding: 0 20px; }
        }
        @media (max-width: 500px) {
          .merch-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="merch-section">
        <div className="merch-badges">
          {badges.map((b) => (
            <div key={b.label} className="merch-badge-pill">
              {b.icon}
              {b.label}
            </div>
          ))}
        </div>

        <div className="merch-hero">
          <h2 className="merch-hero-title">get your mitts on our merch</h2>
          <a href="#" className="merch-shop-link">
            Shop Swag
          </a>
        </div>

        <div className="merch-grid-wrap">
          <h3 className="merch-label">Merch</h3>
          <div className="merch-grid">
            {merch.map((item) => (
              <MerchCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
