import { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useQuickView } from "../context/QuickViewContext";
import { useCart } from "../context/CartContext";

export default function QuickViewPanel() {
  const { product, close } = useQuickView();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [imgHovered, setImgHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQty(1);
      setAdded(false);
      setImgHovered(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [product]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(close, 400);
  };

  const handleAddToCart = () => {
    if (!product) return;
    const price = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price,
        img: product.img,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [product]);

  if (!product) return null;

  const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;

  return (
    <>
      <style>{`
        .qv-overlay {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(0,0,0,0);
          transition: background 0.4s ease;
          pointer-events: none;
        }
        .qv-overlay.visible {
          background: rgba(0,0,0,0.45);
          pointer-events: all;
        }

        .qv-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 9999;
          width: 100%;
          max-width: 440px;
          background: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Lato', sans-serif;
          overflow-y: auto;
        }
        .qv-drawer.visible {
          transform: translateX(0);
        }

        .qv-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px 20px;
          border-bottom: 1px solid #f0ece8;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 5;
        }
        .qv-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }
        .qv-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .qv-close:hover { background: #f0ece8; }

        .qv-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 90%;
          overflow: hidden;
          background: #f5eae8;
          cursor: zoom-in;
          flex-shrink: 0;
        }
        .qv-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: opacity 0.35s ease, transform 0.8s ease;
        }
        .qv-img.base { z-index: 1; }
        .qv-img.hover { z-index: 2; opacity: 0; }
        .qv-img-wrap:hover .qv-img.base  { opacity: 0; transform: scale(1.04); }
        .qv-img-wrap:hover .qv-img.hover { opacity: 1; transform: scale(1.04); }

        .qv-img-badge {
          position: absolute;
          top: 14px; right: 14px;
          z-index: 5;
          background: #2a1710;
          color: #fff;
          border-radius: 50%;
          width: 52px; height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .qv-body {
          padding: 24px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }

        .qv-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }
        .qv-price {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }
        .qv-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .qv-price-sale {
          font-size: 12px;
          color: #888;
          text-decoration: line-through;
        }

        .qv-desc {
          font-size: 13.5px;
          color: #555;
          line-height: 1.75;
          margin: 0;
          padding-top: 4px;
          border-top: 1px solid #f0ece8;
        }

        .qv-qty-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .qv-qty-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #1a1a1a;
        }
        .qv-qty {
          display: flex;
          align-items: center;
          border: 1.5px solid #d5cfc9;
          border-radius: 9999px;
          overflow: hidden;
        }
        .qv-qty-btn {
          background: none;
          border: none;
          width: 36px; height: 36px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          transition: background 0.15s;
        }
        .qv-qty-btn:hover { background: #f5f3f0; }
        .qv-qty-num {
          font-size: 14px;
          font-weight: 600;
          min-width: 32px;
          text-align: center;
          color: #1a1a1a;
        }

        .qv-atc-btn {
          width: 100%;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.13em;
          padding: 16px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          transition: background 0.2s ease;
        }
        .qv-atc-btn:hover { background: #3d2b1f; }
        .qv-atc-btn.added { background: #2e7d32; }

        .qv-full-link {
          text-align: center;
          font-size: 12.5px;
          color: #888;
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Lato', sans-serif;
          transition: color 0.2s;
          padding: 0;
        }
        .qv-full-link:hover { color: #1a1a1a; }

        .qv-shipping-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #666;
          padding: 14px 16px;
          background: #f7f5f2;
          border-radius: 10px;
        }
        .qv-shipping-note svg { flex-shrink: 0; }
      `}</style>
      <div
        className={`qv-overlay${visible ? " visible" : ""}`}
        onClick={handleClose}
      />
      <div className={`qv-drawer${visible ? " visible" : ""}`}>
        {/* Header */}
        <div className="qv-header">
          <p className="qv-header-title">Quick View</p>
          <button className="qv-close" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="qv-img-wrap">
          <img
            src={product.img}
            alt={product.name}
            className="qv-img base"
            draggable={false}
          />
          {product.hoverImg && (
            <img
              src={product.hoverImg}
              alt={product.name}
              className="qv-img hover"
              draggable={false}
            />
          )}
          {product.badge && <div className="qv-img-badge">{product.badge}</div>}
        </div>
        <div className="qv-body">
          <h2 className="qv-name">{product.name}</h2>
          <div className="qv-price-row">
            <p className="qv-price">{product.price}</p>
          </div>
          <p className="qv-desc">
            {product.description ??
              `${product.name} — freshly baked with love in Brisbane. Made with the finest ingredients for the best taste and quality. Order online for delivery or pick up in store.`}
          </p>
          <div className="qv-shipping-note">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            Free shipping on orders over $80
          </div>
          <div className="qv-qty-row">
            <span className="qv-qty-label">Quantity</span>
            <div className="qv-qty">
              <button
                className="qv-qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus size={13} />
              </button>
              <span className="qv-qty-num">{qty}</span>
              <button
                className="qv-qty-btn"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          <button
            className={`qv-atc-btn${added ? " added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
          <button className="qv-full-link">View full details</button>
        </div>
      </div>
    </>
  );
}
