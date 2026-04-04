import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  text: string;
  stars: number;
  name: string;
  product: string;
}

const reviews: Review[] = [
  {
    text: "I love the cookies",
    stars: 5,
    name: "Anonymous",
    product: "Build a Box",
  },
  {
    text: "Honestly always amazing service when I go into the bakery or even purchase online",
    stars: 5,
    name: "RK",
    product: "Pickup Instore",
  },
  {
    text: "Scrumptious, when I heard these were available for a short time I rushed to order and they didnt disappoint. The soft Dubai mixture centre was divine 🤤",
    stars: 5,
    name: "Anne L",
    product: "Dubai Chocolate",
  },
  {
    text: "Quality cookies & excellent service",
    stars: 4,
    name: "Heather Viney",
    product: "Build a Box",
  },
  {
    text: "Absolutely incredible! Best cookies I've ever had. Will definitely be ordering again.",
    stars: 5,
    name: "Jessica M",
    product: "Best Sellers",
  },
  {
    text: "Great packaging and the cookies arrived fresh and delicious. Everyone loved them!",
    stars: 5,
    name: "Tom R",
    product: "Mini Cookie Catering",
  },
  {
    text: "So good, can't stop eating them. The salted caramel one is out of this world.",
    stars: 5,
    name: "Sarah K",
    product: "Cookie Tube",
  },
  {
    text: "Perfect gift idea. My friend was absolutely delighted when she received her box.",
    stars: 4,
    name: "Emily W",
    product: "Mystery Box",
  },
];

const VISIBLE = 4;
const TOTAL = reviews.length;
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={i < count ? "#e8a0a0" : "#e8d0d0"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [start, setStart] = useState(0);
  const [offset, setOffset] = useState(0); 
  const [anim, setAnim] = useState(false);
  const [animDir, setAnimDir] = useState(0); 
  const busy = useRef(false);
  const trackW = useRef(0); 

  const getCard = (offset: number) => reviews[mod(start + offset, TOTAL)];

  const slide = (dir: -1 | 1) => {
    if (busy.current) return;
    busy.current = true;
    setAnimDir(dir);
    setAnim(true);
    setTimeout(() => {
      setStart((s) => mod(s + dir, TOTAL));
      setAnim(false);
      setAnimDir(0);
      busy.current = false;
    }, 500);
  };

  const cards = Array.from({ length: VISIBLE + 2 }, (_, i) => getCard(i - 1));

  return (
    <>
      <style>{`
        .rev-section {
          background: #fff;
          padding: 72px 0 80px;
          font-family: 'Lato', sans-serif;
        }

        .rev-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 2.6vw, 1.9rem);
          font-weight: 500;
          color: #1a1a1a;
          text-align: center;
          margin: 0 0 12px;
        }

        .rev-overall {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 48px;
        }
        .rev-overall-stars { display: flex; gap: 3px; }
        .rev-overall-text  { font-size: 14px; color: #1a1a1a; }

        .rev-layout {
          display: flex;
          align-items: center;
          gap: 0;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 120px;
          position: relative;
        }

        .rev-arrow {
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          opacity: 0.4;
          transition: opacity 0.2s;
          padding: 0 12px;
          z-index: 5;
          display: flex;
          align-items: center;
        }
        .rev-arrow:hover { opacity: 1; }

        .rev-viewport {
          flex: 1;
          overflow: hidden;
        }

        .rev-track {
          display: flex;
          gap: 16px;
          transform: translateX(calc(-1 * (25% - 4px) + ${`${animDir === 1 ? "-" : animDir === -1 ? "+" : ""}${"0"}`}px));
          transition: none;
        }
        .rev-track.sliding {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rev-track.slide-next {
          transform: translateX(calc(-2 * (25% - 4px) - 8px));
        }
        .rev-track.slide-prev {
          transform: translateX(0px);
        }

        .rev-card {
          flex-shrink: 0;
          width: calc(25% - 12px);
          background: #fff;
          border: 1.5px solid #ececec;
          border-radius: 14px;
          padding: 44px 26px 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 360px;
          box-sizing: border-box;
        }

        .rev-text {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.75;
          color: #1a1a1a;
          text-align: center;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 28px;
        }

        .rev-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
        }

        .rev-name {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14.5px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .rev-check {
          background: #1a1a1a;
          border-radius: 50%;
          width: 18px; height: 18px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .rev-product {
          font-size: 13px;
          color: #999;
        }
      `}</style>

      <section className="rev-section">
        <h2 className="rev-title">The internet's favourite cookies</h2>
        <div className="rev-overall">
          <div className="rev-overall-stars">
            {[1, 2, 3, 4].map((i) => (
              <svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#1a1a1a"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="hg2">
                  <stop offset="55%" stopColor="#1a1a1a" />
                  <stop offset="55%" stopColor="#ccc" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="url(#hg2)"
              />
            </svg>
          </div>
          <span className="rev-overall-text">4.67 ★ (2,909)</span>
        </div>

        <div className="rev-layout">
          <button
            className="rev-arrow"
            onClick={() => slide(-1)}
            aria-label="Previous"
          >
            <ChevronLeft size={30} />
          </button>
          <div className="rev-viewport">
            <div
              className={`rev-track${anim ? " sliding" : ""}${anim && animDir === 1 ? " slide-next" : anim && animDir === -1 ? " slide-prev" : ""}`}
            >
              {cards.map((review, i) => (
                <div key={i} className="rev-card">
                  <p className="rev-text">{review.text}</p>
                  <div className="rev-bottom">
                    <Stars count={review.stars} />
                    <div className="rev-name">
                      {review.name}
                      <span className="rev-check">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        >
                          <polyline points="2,6 5,9 10,3" />
                        </svg>
                      </span>
                    </div>
                    <span className="rev-product">{review.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="rev-arrow"
            onClick={() => slide(1)}
            aria-label="Next"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </section>
    </>
  );
}
