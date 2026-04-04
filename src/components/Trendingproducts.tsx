import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TrendItem {
  img: string;
  brand: string;
  name: string;
  price: string;
  boldDesc: string;
  desc: string;
}

const items: TrendItem[] = [
  {
    img: "/src/assets/trend-1.png",
    brand: "Brooki Bakehouse",
    name: "Message Brownie",
    price: "$60.00",
    boldDesc: "Message Brownie",
    desc: "Say it with chocolate. 💠 Because sometimes words aren't enough — let our message brownies do the talking.",
  },
  {
    img: "/src/assets/trend-2.png",
    brand: "Brooki Bakehouse",
    name: "Cookie Catering",
    price: "From $175.00",
    boldDesc: "",
    desc: "Looking for the perfect sweet addition to your next event? Our cookie catering and corporate gifting option...",
  },
  {
    img: "/src/assets/trend-3.png",
    brand: "Brooki Bakehouse",
    name: "Best Sellers Box",
    price: "$40.00",
    boldDesc: "",
    desc: "Can't choose? Don't. Our best sellers box brings together the most loved flavours in one beautiful package.",
  },
];

const TOTAL = items.length;
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function TrendingProducts() {
  const [current, setCurrent] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [transition, setTransition] = useState(true);
  const busy = useRef(false);

  const go = (dir: "left" | "right") => {
    if (busy.current) return;
    busy.current = true;
    setTransition(true);
    setTranslateX(dir === "left" ? -1 : 1);

    setTimeout(() => {
      setCurrent((c) =>
        dir === "left" ? mod(c + 1, TOTAL) : mod(c - 1, TOTAL),
      );
      setTransition(false);
      setTranslateX(0);
      setTimeout(() => {
        setTransition(true);
        busy.current = false;
      }, 30);
    }, 520);
  };

  const visibleItems = [
    { ...items[mod(current - 1, TOTAL)], key: `a-${current}` },
    { ...items[mod(current, TOTAL)], key: `b-${current}` },
    { ...items[mod(current + 1, TOTAL)], key: `c-${current}` },
    { ...items[mod(current + 2, TOTAL)], key: `d-${current}` },
  ];

  const PAIR_VW = 68;

  return (
    <>
      <style>{`
        .tr-section {
          background: #fff;
          padding: 52px 0 72px;
          font-family: 'Lato', sans-serif;
          overflow: hidden;
        }

        .tr-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
          padding: 0 48px;
        }

        .tr-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .tr-arrows { display: flex; gap: 10px; }

        .tr-arrow {
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1.5px solid #d0d0d0;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
        }
        .tr-arrow:hover {
          background: #1a1a1a;
          border-color: #1a1a1a;
          color: #fff;
        }

        .tr-viewport {
          width: 100%;
          overflow: hidden;
          padding-left: 48px;
          box-sizing: border-box;
        }

        .tr-track {
          display: flex;
          gap: 28px;
          will-change: transform;
        }
        .tr-track.animated {
          transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tr-pair {
          display: flex;
          align-items: stretch;
          flex-shrink: 0;
          width: ${PAIR_VW}vw;
          min-width: ${PAIR_VW}vw;
          gap: 0;
        }

        .tr-img-card {
          width: 47%;
          min-width: 47%;
          border-radius: 18px;
          overflow: hidden;
          background: #f5c5cc;
          cursor: pointer;
          position: relative;
        }

        .tr-img-card img {
          width: 100%;
          height: 100%;
          min-height: 540px;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 1s ease;
          transform: scale(1.0);
        }
        .tr-img-card:hover img {
          transform: scale(1.08);
        }

        .tr-text {
          flex: 1;
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
          background: #fff;
        }

        .tr-brand {
          font-size: 13.5px;
          color: #888;
          margin: 0;
          font-weight: 400;
        }

        .tr-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.1;
        }

        .tr-price {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .tr-bold-desc {
          font-size: 14.5px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .tr-desc {
          font-size: 14px;
          line-height: 1.75;
          color: #444;
          margin: 0;
        }

        .tr-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 14px 32px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          width: fit-content;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .tr-btn:hover { background: #3d2b1f; }

        @media (max-width: 900px) {
          .tr-pair { width: 90vw; min-width: 90vw; }
          .tr-text { padding: 28px 24px; }
          .tr-header, .tr-viewport { padding-left: 20px; }
          .tr-header { padding-right: 20px; }
        }
        @media (max-width: 600px) {
          .tr-pair { flex-direction: column; width: 88vw; min-width: 88vw; }
          .tr-img-card { width: 100%; min-width: 100%; }
          .tr-img-card img { min-height: 300px; }
        }
      `}</style>

      <section className="tr-section">
        <div className="tr-header">
          <h2 className="tr-title">Trending Products</h2>
          <div className="tr-arrows">
            <button
              className="tr-arrow"
              onClick={() => go("right")}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="tr-arrow"
              onClick={() => go("left")}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="tr-viewport">
          <div
            className={`tr-track${transition ? " animated" : ""}`}
            style={{
              transform: `translateX(calc(${(-1 + translateX) * 68}vw + ${(-1 + translateX) * 28}px))`,
            }}
          >
            {visibleItems.map((item) => (
              <div className="tr-pair" key={item.key}>
                <div className="tr-img-card">
                  <img src={item.img} alt={item.name} draggable={false} />
                </div>
                <div className="tr-text">
                  <p className="tr-brand">{item.brand}</p>
                  <h3 className="tr-name">{item.name}</h3>
                  <p className="tr-price">{item.price}</p>
                  {item.boldDesc && (
                    <p className="tr-bold-desc">{item.boldDesc}</p>
                  )}
                  <p className="tr-desc">{item.desc}</p>
                  <button className="tr-btn">Shop Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
