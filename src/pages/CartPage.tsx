import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

const suggestions = [
  {
    id: "sug-1",
    name: "Happy Birthday Postcard",
    price: 2.0,
    img: "/src/assets/happy-1.png",
  },
  {
    id: "sug-2",
    name: "Congrats Postcard",
    price: 2.0,
    img: "/src/assets/happy-2.png",
  },
  {
    id: "sug-3",
    name: "Just for You Postcard",
    price: 2.0,
    img: "/src/assets/happy-3.png",
  },
  {
    id: "sug-4",
    name: "HBD. Postcard",
    price: 2.0,
    img: "/src/assets/happy-4.png",
  },
];

export default function CartPage() {
  const { items, removeItem, updateQty, addToCart } = useCart();
  const [delivery, setDelivery] = useState<"shipping" | "pickup">("shipping");
  const [shippingOpen, setShippingOpen] = useState(false);
  const [hoveredSug, setHoveredSug] = useState<string | null>(null);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const remaining = Math.max(0, 80 - subtotal);
  const progress = Math.min((subtotal / 80) * 100, 100);

  return (
    <>
      <style>{`
        .cp-page {
          background: #fff;
          font-family: 'Lato', sans-serif;
          min-height: 70vh;
          color: #1a1a1a;
        }
        .cp-empty {
          padding: 100px 80px 80px;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .cp-coll-wrap {
          align-self: flex-start;
          margin-top: 0;
        }

        .cp-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 3.6rem);
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
          line-height: 1.10;
        }

        .cp-empty-sub {
          font-size: 16px;
          color: #1a1a1a;
          margin: 0 0 52px;
          line-height: 1.7;
        }

        .cp-coll-card {
          display: inline-flex;
          flex-direction: column;
          width: 320px;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          background: #f5eae8;
          transition: box-shadow 0.25s ease;
        }
        .cp-coll-card:hover {
          box-shadow: 0 10px 32px rgba(0,0,0,0.12);
        }
        .cp-coll-img-wrap {
          width: 100%;
          padding-top: 85%;
          position: relative;
          overflow: hidden;
        }
        .cp-coll-img-wrap img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s ease;
        }
        .cp-coll-card:hover .cp-coll-img-wrap img {
          transform: scale(1.05);
        }
        .cp-coll-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          background: #fff;
        }
        .cp-coll-name {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .cp-coll-arrow {
          width: 36px; height: 36px;
          background: #f0ece8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          font-size: 15px;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cp-coll-card:hover .cp-coll-arrow {
          background: #1a1a1a;
          color: #fff;
        }

        .cp-inner {
          max-width: 100%;
          margin: 0 auto;
          padding: 56px 80px 80px;
        }

        .cp-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 600;
          text-align: center;
          margin: 0 0 8px;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        .cp-ship-bar {
          text-align: center;
          margin-bottom: 36px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0ece8;
        }
        .cp-ship-text { font-size: 13px; color: #444; margin: 0 0 10px; }
        .cp-ship-text strong { color: #1a1a1a; font-weight: 700; }
        .cp-bar-bg {
          max-width: 420px; margin: 0 auto;
          background: #e8e4df; border-radius: 9999px;
          height: 4px; overflow: hidden;
        }
        .cp-bar-fill {
          background: #1a1a1a; height: 100%;
          border-radius: 9999px; transition: width 0.5s ease;
        }

        .cp-table-head {
          display: grid;
          grid-template-columns: 1fr 130px 150px 100px;
          padding: 10px 0;
          border-bottom: 1.5px solid #1a1a1a;
          font-size: 11.5px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .cp-table-head span:nth-child(2),
        .cp-table-head span:nth-child(3) { text-align: center; }
        .cp-table-head span:last-child { text-align: right; }

        .cp-row {
          display: grid;
          grid-template-columns: 1fr 130px 150px 100px;
          align-items: center;
          padding: 22px 0;
          border-bottom: 1px solid #f0ece8;
          gap: 8px;
        }
        .cp-row-product { display: flex; align-items: flex-start; gap: 16px; }
        .cp-row-img {
          width: 80px; height: 80px;
          border-radius: 12px; overflow: hidden;
          background: #f5eae8; flex-shrink: 0;
        }
        .cp-row-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .cp-row-name { font-size: 14px; font-weight: 600; color: #1a1a1a; margin: 0 0 4px; }
        .cp-row-est { font-size: 12px; color: #aaa; margin: 0 0 10px; }
        .cp-row-remove {
          background: none; border: none; font-size: 12px;
          color: #888; cursor: pointer; padding: 0;
          text-decoration: underline; font-family: 'Lato', sans-serif;
          transition: color 0.2s;
        }
        .cp-row-remove:hover { color: #1a1a1a; }
        .cp-row-price { font-size: 14px; color: #1a1a1a; text-align: center; }

        .cp-qty {
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #d5cfc9; border-radius: 9999px;
          width: fit-content; margin: 0 auto; overflow: hidden;
        }
        .cp-qty-btn {
          background: none; border: none; width: 32px; height: 32px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; color: #1a1a1a; transition: background 0.15s;
        }
        .cp-qty-btn:hover { background: #f5f3f0; }
        .cp-qty-num {
          font-size: 13.5px; font-weight: 600;
          min-width: 26px; text-align: center; color: #1a1a1a;
        }
        .cp-row-total { font-size: 14px; font-weight: 600; text-align: right; }

        .cp-delivery-toggle {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid #e0dbd4; border-radius: 14px;
          overflow: hidden; margin: 28px 0 10px;
        }
        .cp-del-btn {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 5px; padding: 16px;
          background: #fff; border: none; cursor: pointer;
          font-family: 'Lato', sans-serif; font-size: 13px;
          font-weight: 600; color: #aaa;
          border-right: 1px solid #e0dbd4;
          transition: background 0.2s, color 0.2s;
        }
        .cp-del-btn:last-child { border-right: none; }
        .cp-del-btn.active { background: #f7f5f2; color: #1a1a1a; }
        .cp-del-icon { font-size: 20px; }
        .cp-please { font-size: 12.5px; color: #888; margin: 0 0 28px; }

        .cp-pickup-form {
        border: 1px solid #e0dbd4;
        border-radius: 14px;
        padding: 24px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        animation: cp-fade-in 0.25s ease;
        }
        @keyframes cp-fade-in {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
        }
        .cp-field-label {
        font-size: 14px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 8px;
        display: block;
       }
       .cp-field-input {
       width: 100%;
       border: none;
       border-bottom: 1px solid #d5cfc9;
       padding: 10px 0;
       font-size: 14px;
       font-family: 'Lato', sans-serif;
       color: #1a1a1a;
       background: transparent;
       outline: none;
       box-sizing: border-box;
       transition: border-color 0.2s;
       }
       .cp-field-input::placeholder { color: #bbb; }
       .cp-field-input:focus { border-bottom-color: #1a1a1a; }
       .cp-field-row {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 16px;
       }

        .cp-summary { display: flex; flex-direction: column; align-items: flex-end; }
        .cp-estimate-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 400px; background: #fff;
          border: 1px solid #e0dbd4; border-radius: 12px;
          padding: 14px 18px; cursor: pointer;
          font-family: 'Lato', sans-serif; font-size: 14px;
          font-weight: 500; color: #1a1a1a; margin-bottom: 18px;
          transition: border-color 0.2s;
        }
        .cp-estimate-btn:hover { border-color: #1a1a1a; }
        .cp-estimate-inner { display: flex; align-items: center; gap: 10px; }
        .cp-total-row {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; max-width: 400px; margin-bottom: 6px;
        }
        .cp-total-label { font-size: 15px; font-weight: 700; }
        .cp-total-amount { font-size: 15px; font-weight: 700; }
        .cp-total-note {
          font-size: 15.2px; color: #1a1a1a; width: 100%; max-width: 400px;
          margin:0  0 80px; text-align: left; line-height: 1.55;
        }
        .cp-total-note a { color: #1a1a1a; text-decoration: underline; }
        .cp-checkout-btn {
          width: 100%; max-width: 400px; background: #1a1a1a; color: #fff;
          border: none; border-radius: 9999px; font-size: 12px;
          font-weight: 700; letter-spacing: 0.13em; padding: 17px;
          text-transform: uppercase; cursor: pointer;
          font-family: 'Lato', sans-serif; transition: background 0.2s;
        }
        .cp-checkout-btn:hover { background: #3d2b1f; }

        .cp-also {
          padding: 80px 56px 96px;
          border-top: 1px solid #f0ece8;
          background: #fff;
        }
        .cp-also-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 600;
          text-align: center;
          margin: 0 0 48px;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }
        .cp-also-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cp-sug-card {
          background: #f5f5f5; border-radius: 16px; overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .cp-sug-img-box {
          position: relative;
          width: 100%;
          padding-top: 130%;
          border-radius-top: 16px;
          overflow: hidden;
          background: #f0dde0;
          margin-bottom: 10px;
        }
        .cp-sug-img-box img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.8s ease;
        }
        .cp-sug-card:hover .cp-sug-img-box img {
          transform: scale(1.05);
        }

        .cp-sug-search-btn {
          position: absolute;
          top: 12px; right: 12px;
          z-index: 5;
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a1a1a;
          opacity: 0;
          transition: opacity 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .cp-sug-card:hover .cp-sug-search-btn {
          opacity: 1;
        }

        .cp-sug-atc-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 16px 16px;
          z-index: 5;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }
        .cp-sug-card:hover .cp-sug-atc-overlay {
          opacity: 1;
          transform: translateY(0);
        }
        .cp-sug-atc-btn {
          width: 100%;
          background: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 13px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          color: #1a1a1a;
          transition: background 0.2s, color 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
        }
        .cp-sug-atc-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .cp-sug-info {
          padding: 30px 30px;
        }
        .cp-sug-name {
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 2px 0 6px;
          line-height: 1.8;
        }
        .cp-sug-price {
          font-size: 16px;
          font-weight: 950;
          color: #1a1a1a;
          margin: 0;
        }
          
        @media (max-width: 900px) {
          .cp-also-grid { grid-template-columns: repeat(2, 1fr); }
          .cp-also { padding: 56px 24px 72px; }
          .cp-empty { padding: 60px 24px 60px; }
        }
        @media (max-width: 700px) {
          .cp-table-head, .cp-row {
            grid-template-columns: 1fr 80px 100px 80px;
          }
          .cp-inner { padding: 40px 20px 60px; }
        }
      `}</style>

      <div className="cp-page">
        {items.length === 0 ? (
          <div className="cp-empty">
            <h1 className="cp-empty-title">Your cart is currently empty.</h1>
            <p className="cp-empty-sub">
              Not sure where to start?
              <br />
              Try these collections:
            </p>

            <div className="cp-coll-wrap">
              <Link to="/" className="cp-coll-card">
                <div className="cp-coll-img-wrap">
                  <img
                    src="/src/assets/pop-2.png"
                    alt="Cookies"
                    draggable={false}
                  />
                </div>
                <div className="cp-coll-footer">
                  <span className="cp-coll-name">Cookies</span>
                  <span className="cp-coll-arrow">↗</span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cp-inner">
            <h1 className="cp-heading">Your cart</h1>

            <div className="cp-ship-bar">
              {remaining === 0 ? (
                <p className="cp-ship-text">
                  🎉 You've unlocked <strong>free shipping!</strong>
                </p>
              ) : (
                <p className="cp-ship-text">
                  Spend <strong>${remaining.toFixed(2)}</strong> more to reach
                  free shipping!
                </p>
              )}
              <div className="cp-bar-bg">
                <div
                  className="cp-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="cp-table-head">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="cp-row">
                <div className="cp-row-product">
                  <div className="cp-row-img">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div>
                    <p className="cp-row-name">{item.name}</p>
                    <p className="cp-row-est">
                      Order Estimation: Apr 1st – Apr 4th
                    </p>
                    <button
                      className="cp-row-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cp-row-price">${item.price.toFixed(2)}</div>
                <div className="cp-qty">
                  <button
                    className="cp-qty-btn"
                    onClick={() => updateQty(item.id, -1)}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="cp-qty-num">{item.qty}</span>
                  <button
                    className="cp-qty-btn"
                    onClick={() => updateQty(item.id, 1)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <div className="cp-row-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="cp-delivery-toggle">
              <button
                className={`cp-del-btn${delivery === "shipping" ? " active" : ""}`}
                onClick={() => setDelivery("shipping")}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Shipping</span>
              </button>
              <button
                className={`cp-del-btn${delivery === "pickup" ? " active" : ""}`}
                onClick={() => setDelivery("pickup")}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Pickup In Store</span>
              </button>
            </div>

            {delivery === "pickup" && (
              <div className="cp-pickup-form">
                <div>
                  <label className="cp-field-label">Pickup Date</label>
                  <input
                    type="datetime-local"
                    className="cp-field-input"
                    placeholder="Choose a date/time"
                  />
                </div>
                <div>
                  <label className="cp-field-label">
                    Name of person collecting
                  </label>
                  <div className="cp-field-row">
                    <input
                      className="cp-field-input"
                      placeholder="First name"
                    />
                    <input className="cp-field-input" placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <label className="cp-field-label">Contact Number</label>
                  <input
                    className="cp-field-input"
                    placeholder="(123)-456-7890"
                    type="tel"
                  />
                </div>
                <div>
                  <label className="cp-field-label">Your email address</label>
                  <input
                    className="cp-field-input"
                    placeholder="email address"
                    type="email"
                  />
                </div>
              </div>
            )}

            <p className="cp-please">
              Please click the checkout button to continue.
            </p>

            <div className="cp-summary">
              <button
                className="cp-estimate-btn"
                onClick={() => setShippingOpen((o) => !o)}
              >
                <span className="cp-estimate-inner">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Estimate Shipping
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: shippingOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              <div className="cp-total-row">
                <span className="cp-total-label">Estimated total</span>
                <span className="cp-total-amount">
                  ${subtotal.toFixed(2)} AUD
                </span>
              </div>
              <p className="cp-total-note">
                Tax included. <a href="#">Shipping</a> and discounts calculated
                at checkout.
              </p>
              <button className="cp-checkout-btn">Check Out</button>
            </div>
          </div>
        )}

        <div className="cp-also">
          <h2 className="cp-also-title">You may also like</h2>
          <div className="cp-also-grid">
            {suggestions.map((s) => (
              <div
                key={s.id}
                className="cp-sug-card"
                onMouseEnter={() => setHoveredSug(s.id)}
                onMouseLeave={() => setHoveredSug(null)}
              >
                <div className="cp-sug-img-box">
                  <img src={s.img} alt={s.name} draggable={false} />

                  <button className="cp-sug-search-btn" aria-label="Quick view">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>

                  <div className="cp-sug-atc-overlay">
                    <button
                      className="cp-sug-atc-btn"
                      onClick={() =>
                        addToCart({
                          id: s.id,
                          name: s.name,
                          price: s.price,
                          img: s.img,
                        })
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
                <div className="cp-sug-info">
                  <p className="cp-sug-name">{s.name}</p>
                  <p className="cp-sug-price">${s.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
