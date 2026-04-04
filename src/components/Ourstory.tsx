export default function OurStory() {
  return (
    <>
      <style>{`
        .story-section {
          background: #fff;
          padding: 24px 40px 64px;
          font-family: 'Lato', sans-serif;
        }

        .story-card {
          background: #ede8df;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          min-height: 680px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .story-left {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 72px 64px;
        }

        .story-label {
          font-size: 15px;
          font-weight: 500;
          color: #3d2b1f;
          letter-spacing: 0.06em;
          margin: 0 0 16px;
        }

        .story-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 28px;
          line-height: 1.1;
        }

        .story-body {
          font-size: 15.5px;
          line-height: 1.95;
          color: #3d2b1f;
          margin: 0 0 40px;
          max-width: 400px;
          font-weight: 400;
        }

        .story-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 13px 32px;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          transition: background 0.2s ease;
        }
        .story-btn:hover { background: #3d2b1f; }

        .story-right {
          flex: 3;
          position: relative;
          min-height: 500px;
          overflow: hidden;
        }

        .story-right video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .story-card {
            flex-direction: column;
          }
          .story-right {
            min-height: 320px;
          }
          .story-left {
            padding: 48px 32px;
          }
          .story-section {
            padding: 16px 16px 48px;
          }
        }
      `}</style>

      <section className="story-section">
        <div className="story-card">
          <div className="story-left">
            <p className="story-label">Our Story</p>
            <h2 className="story-heading">Brooki</h2>
            <p className="story-body">
              Brooki started in 2022 with a bold idea:
              <br />
              baked goods deserve better.
              <br />
              <br />
              Better ingredients. Bigger bites. More of everything that actually
              matters. Our chunky cookies are built to impress. Our fudgy
              brownies are dense, rich, and completely uncompromising. We bake
              for people who know the difference — and refuse to settle for
              anything less. Sweet doesn't have to mean ordinary.
              <br />
              <br />
              At Brooki, it never does.
            </p>
            <button className="story-btn">Read More</button>
          </div>

          <div className="story-right">
            <video src="/src/assets/clip.mp4" autoPlay muted loop playsInline />
          </div>
        </div>
      </section>
    </>
  );
}
