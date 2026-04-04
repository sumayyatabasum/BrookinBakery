import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const stores = [
  {
    name: "Fortitude Valley",
    address: "15 Marshall Street, Fortitude Valley, Brisbane",
    hours: "Open 7 days\nMon–Fri: 8:00am – 3:30pm\nSat–Sun: 8:00am – 3:00pm",
  },
  {
    name: "Brisbane CBD",
    address: "Queens Plaza Lower Ground",
    hours:
      "Open 7 days\nMon–Thu: 9:00am – 4:00pm\nFri: 9:00am – 9:00pm\nSun: 11:00am – 4:00pm",
  },
  {
    name: "Brisbane Domestic Airport",
    address: "Brisbane Domestic Airport",
    hours: "Open 7 days\n6:00am – 7:00pm daily",
  },
  {
    name: "Brisbane Chermside",
    address: "Westfield Chermside",
    hours:
      "Open 7 days\nMon–Wed: 9:00am – 5:00pm\nThu: 9:00am – 9:00pm\nFri: 9:00am – 5:00pm\nSat: 9:00am – 5:00pm\nSun: 10:00am – 5:00pm",
  },
  {
    name: "Gold Coast",
    address: "Gold Coast",
    hours:
      "Open 7 days\nMon–Sat: 8:30am – 5:30pm\nThu till 9:00pm\nSun: 9:00am – 4:00pm",
  },
  {
    name: "Sydney Airport",
    address: "Terminal 2, Domestic",
    hours: "Open 7 days\n6:00am – 8:30pm daily",
  },
];

export default function PressAndStores() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <style>{`
        .press-bar {
          background: #fff;
          border-top: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
          overflow: hidden;
          padding: 50px 0;
        }
          .press-bar:hover .press-track {
          animation-play-state: paused;
        }
        .press-track {
          display: flex;
          align-items: center;
          gap: 64px;
          white-space: nowrap;
          animation: pressMarquee 110s linear infinite;
          width: max-content;
        }
        
        @keyframes pressMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .press-logo {
          height: 44px;
          width: auto;
          object-fit: contain;
          opacity: 0.85;
          filter: grayscale(0%);
          flex-shrink: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
          cursor: pointer;
        }
        .press-logo:hover {
          transform: scale(1.18);
          opacity: 1;
        }

        .stores-section {
          background: #ede8df;
          padding: 72px 56px;
          font-family: 'Lato', sans-serif;
        }

        .stores-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 220px 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .stores-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          padding-top: 8px;
          line-height: 1.3;
        }

        .stores-img-wrap {
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 3/4;
          width: 100%;
          margin: 0 auto;
          display: block;
        }
        .stores-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .stores-accordion {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 4px;
        }

        .store-item {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid transparent;
          transition: border-color 0.2s ease;
        }
        .store-item.open {
          border-color: #d0c8c0;
        }

        .store-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          cursor: pointer;
          background: #fff;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'Lato', sans-serif;
        }

        .store-name {
          font-size: 14.5px;
          font-weight: 500;
          color: #1a1a1a;
          margin: 0;
        }

        .store-icon {
          color: #1a1a1a;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .store-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s ease, padding 0.45s ease, border-color 0.45s ease;
          padding: 0 20px;
          border-top: 1px solid transparent;
        }
        .store-body.open {
          max-height: 300px;
          padding: 0 20px 20px;
          border-top: 1px solid #e8e4df;
        }

        .store-address {
          font-size: 13.5px;
          color: #1a1a1a;
          margin: 14px 0 10px;
          line-height: 1.6;
        }
        .store-hours {
          font-size: 13.5px;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.9;
        }

        @media (max-width: 900px) {
          .stores-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .stores-img-wrap {
            aspect-ratio: 4/3;
          }
          .stores-section { padding: 48px 24px; }
        }
      `}</style>

      <div className="press-bar">
        <div className="press-track">
          {[...Array(6)].map((_, setIdx) =>
            [1, 2, 3, 4].map((n) => (
              <img
                key={`${setIdx}-${n}`}
                src={`/src/assets/part-${n}.png`}
                alt={`Press ${n}`}
                className="press-logo"
                draggable={false}
              />
            )),
          )}
        </div>
      </div>

      <section className="stores-section">
        <div className="stores-inner">
          <h2 className="stores-heading">Visit our stores</h2>

          <div className="stores-img-wrap">
            <img
              src="/src/assets/car.png"
              alt="Brooki store"
              draggable={false}
            />
          </div>

          <div className="stores-accordion">
            {stores.map((store, i) => (
              <div
                key={store.name}
                className={`store-item${openIdx === i ? " open" : ""}`}
              >
                <button className="store-header" onClick={() => toggle(i)}>
                  <span className="store-name">{store.name}</span>
                  <span className="store-icon">
                    {openIdx === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div className={`store-body${openIdx === i ? " open" : ""}`}>
                  <p className="store-address">{store.address}</p>
                  <p className="store-hours">
                    {store.hours.split("\n").map((line, li) => (
                      <span key={li} style={{ display: "block" }}>
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
