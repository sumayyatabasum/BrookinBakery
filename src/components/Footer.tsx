import { useState } from "react";
import { ArrowRight } from "lucide-react";
export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{`
      
        .footer {
          background: white;
          font-family: 'Lato', sans-serif;
          padding: 28px 56px 0;
          border-top: 1px solid #e0dbd4;
          margin-top: 0px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.4fr 0.8fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid #e0dbd4;
        }

        .footer-subscribe h2 {
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 12px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .footer-subscribe p {
          font-size: 13.5px;
          color: #555;
          margin: 0 0 24px;
          line-height: 1.6;
        }

        .footer-input-wrap {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e0dbd4;
          border-radius: 9999px;
          padding: 12px 14px 12px 20px;
          gap: 10px;
          margin-bottom: 16px;
          transition: border-color 0.2s ease;
        }
        .footer-input-wrap:focus-within {
          border-color: #1a1a1a;
        }
        .footer-input-wrap input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 13.5px;
          color: #1a1a1a;
          font-family: 'Lato', sans-serif;
        }
        .footer-input-wrap input::placeholder { color: #aaa; }
        .footer-submit {
          background: #f0ece8;
          border: none;
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a1a1a;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .footer-submit:hover { background: #1a1a1a; color: #fff; }

        .footer-legal {
          font-size: 12px;
          color: #888;
          line-height: 1.6;
          margin: 0;
        }
        .footer-legal a {
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .footer-legal a:hover { opacity: 0.6; }

        .footer-nav h3 {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 20px;
        }
        .footer-nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-nav ul li a {
          font-size: 14px;
          color: #444;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-nav ul li a:hover { color: #1a1a1a; }

        .footer-service h3 {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 20px;
        }
        .footer-service-email {
          font-size: 14px;
          color: #444;
          margin: 0 0 4px;
          text-decoration: none;
          display: block;
        }
        .footer-service-email:hover { color: #1a1a1a; }
        .footer-service-hours {
          font-size: 13px;
          color: #888;
          margin: 0 0 20px;
        }
        .footer-company {
          font-size: 14px;
          color: #444;
          margin: 0 0 4px;
        }
        .footer-acn {
          font-size: 14px;
          color: #444;
          font-weight: 400;
          margin: 0 0 20px;
        }
        .footer-acn strong { font-weight: 700; }
        .footer-store-link {
          font-size: 14px;
          color: #1a1a1a;
          text-decoration: none;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }

        .footer-bottom {
          padding: 40px 0 40px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-bottom-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-region {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #1a1a1a;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: 'Lato', sans-serif;
          font-weight: 400;
        }

        .footer-copyright {
          font-size: 13px;
          color: #555;
          margin: 0;
        }
        .footer-copyright a {
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }

        .footer-shop-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #5b4de8;
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          padding: 12px 24px;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          transition: background 0.2s ease;
          width: fit-content;
        }
        .footer-shop-btn:hover { background: #4a3dd0; }
        .footer-shop-btn svg { width: 18px; height: 18px; }

        .footer-bottom-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          padding-top: 4px;
        }

       .footer-socials {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .footer-social-link {
          color: #1a1a1a;
          transition: opacity 0.2s ease;
          display: flex;
          align-items: center;
        }
        .footer-social-link:hover { opacity: 0.45; }

        .tiktok-icon {
          width: 22px; height: 22px;
          fill: #1a1a1a;
        }

        .footer-payments {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .pay-badge {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 5px 9px;
          font-size: 10.5px;
          font-weight: 700;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 4px;
          height: 30px;
          white-space: nowrap;
        }
        .pay-badge.apple  { font-size: 11px; }
        .pay-badge.google { color: #444; font-size: 11px; }
        .pay-badge.master { background: #eb001b; color: #fff; }
        .pay-badge.shop   { background: #5b4de8; color: #fff; }
        .pay-badge.union  { background: #c0392b; color: #fff; font-size: 9.5px; }
        .pay-badge.visa   { color: #1a1f71; font-style: italic; font-size: 14px; font-weight: 900; letter-spacing: -0.02em; }
          
        .footer-nav ul li a,
        .footer-service-email,
        .footer-store-link {
          position: relative;
          display: inline-block;
          text-decoration: none;
        }
        .footer-nav ul li a::after,
        .footer-service-email::after,
        .footer-store-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1.5px;
          background-color: #1a1a1a;
          transition: width 0.25s ease;
        }
        .footer-nav ul li a:hover::after,
        .footer-service-email:hover::after,
        .footer-store-link:hover::after {
          width: 100%;
        }

        @media (max-width: 960px) {
          .footer-top { grid-template-columns: 1fr 1fr; }
          .footer { padding: 48px 24px 0; }
        }
        @media (max-width: 580px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          .footer-bottom-right { align-items: flex-start; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-subscribe">
            <h2>Subscribe to our emails</h2>
            <p>
              Be the first to know about new collections and exclusive offers.
            </p>
            <div className="footer-input-wrap">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="footer-submit" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="footer-legal">
              By subscribing you agree to the <a href="#">Terms of Use</a> &amp;{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>

          <div className="footer-nav">
            <h3>About</h3>
            <ul>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-service">
            <h3>Customer Service</h3>
            <a
              href="mailto:orders@brookibakehouse.com"
              className="footer-service-email"
            >
              orders@brookibakehouse.com
            </a>
            <p className="footer-service-hours">8:00am – 3:00pm, Mon to Fri</p>
            <p className="footer-company">BROOKI PTY LTD</p>
            <p className="footer-acn">
              ACN: <strong>64 671 342 644</strong>
            </p>
            <a href="#" className="footer-store-link">
              Store Locations
            </a>
          </div>

          {/* Info */}
          <div className="footer-nav">
            <h3>Info</h3>
            <ul>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            {/* Region */}
            <button className="footer-region">
              <span>🇦🇺</span>
              <span>Australia (AUD $)</span>
              <span style={{ fontSize: 10 }}>▾</span>
            </button>

            <p className="footer-copyright">
              © 2026 Brooki Bakehouse. <a href="#">Powered by Shopify</a>
            </p>

            <button className="footer-shop-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.7C6.1 21.7 1.3 16.9 1.3 11S6.1.3 12 .3 22.7 5.1 22.7 11 17.9 21.7 12 21.7zm0-1.4c5.1 0 9.3-4.2 9.3-9.3S17.1 1.7 12 1.7 2.7 5.9 2.7 11s4.2 9.3 9.3 9.3z" />
              </svg>
              Follow on shop
            </button>
          </div>

          <div className="footer-bottom-right">
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="footer-social-link" aria-label="TikTok">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>

            {/* Payment badges */}
            <div className="footer-payments">
              <div className="pay-badge apple">🍎 Pay</div>
              <div className="pay-badge google">G Pay</div>
              <div className="pay-badge master">●● Mastercard</div>
              <div className="pay-badge shop">Shop Pay</div>
              <div className="pay-badge union">UnionPay</div>
              <div className="pay-badge visa">VISA</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
