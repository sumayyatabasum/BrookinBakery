export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero-section {
          width: 100%;
          padding: 0;
          margin: 0;
          font-family: 'Lato', sans-serif;
          user-select: none;
          overflow: hidden;
        }

        .hero-card {
          position: relative;
          width: 100%;
          min-height: 120vh;
          display: flex;
          align-items: center;
        }

        /* Full-bleed background image */
        .hero-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          animation: heroZoom 1.4s ease forwards;
        }

        @keyframes heroZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1.0); }
        }

        .hero-overlay {
          position: relative;
          padding: 0 0 0 72px;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hero-main-heading {
          font-family: 'Nunito', 'Lato', sans-serif;
          font-size: clamp(3rem, 6.5vw, 7rem);
          font-weight: 950;
          color: #fff;
          line-height: 1.0;
          margin: 0 0 0 0;
          letter-spacing: -0.02em;
          text-transform: lowercase;
        }

        .hero-bottom-right {
          position: absolute;
          bottom: 48px;
          right: 56px;
          z-index: 2;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .hero-cta-text {
          font-size: clamp(0.85rem, 1.5vw, 1.1rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
        }

        .hero-insta {
          position: absolute;
          bottom: 120px;
          right: 56px;
          z-index: 2;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.06em;
          font-weight: 500;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .hero-box-label {
          position: absolute;
          top: 22%;
          right: 18%;
          z-index: 2;
          text-align: center;
          pointer-events: none;
        }

        .hero-box-label p {
          font-size: clamp(0.6rem, 1vw, 0.85rem);
          font-weight: 600;
          color: #5c2d3a;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-overlay { padding: 0 0 0 28px; }
          .hero-main-heading { font-size: clamp(2.8rem, 10vw, 4rem); }
          .hero-bottom-right { bottom: 28px; right: 24px; }
          .hero-card { min-height: 60vw; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-card">
          <img
            className="hero-bg-img"
            src="/src/assets/hero-1.png"
            alt="The box that started it all"
            draggable={false}
          />

          <div className="hero-overlay">
            <h1 className="hero-main-heading">
              the box that
              <br />
              started it all
            </h1>
          </div>

          <div className="hero-bottom-right">
            <p className="hero-cta-text">6 Chunky Cookies. Shop Now.</p>
          </div>
        </div>
      </section>
    </>
  );
}
