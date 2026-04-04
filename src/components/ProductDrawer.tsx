import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export interface DrawerProduct {
  id: string;
  name: string;
  price: number | string;
  img: string;
  images?: string[];
  description?: string;
  flavours?: string[];
  features?: string[];
  tag?: string;
}

interface ProductDrawerProps {
  product: DrawerProduct | null;
  onClose: () => void;
}

export default function ProductDrawer({
  product,
  onClose,
}: ProductDrawerProps) {
  const [selectedFlavour, setSelectedFlavour] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedFlavour("");
      setQty(1);
      setImgIndex(0);
      setAdded(false);
    }
  }, [product?.id]);

  const isOpen = !!product;

  const numericPrice = product
    ? typeof product.price === "number"
      ? product.price
      : parseFloat(String(product.price).replace(/[^0-9.]/g, ""))
    : 0;

  const images = product?.images?.length
    ? product.images
    : product
      ? [product.img]
      : [];

  const flavours = product?.flavours ?? [
    "Best Sellers",
    "Choc Chip",
    "Red Velvet",
    "Double Choc",
  ];

  const activeFlavour = selectedFlavour || flavours[0];

  return (
    <>
      <style>{`
        .pd-overlay {
          position: fixed;
          inset: 0;
          z-index: 9998;
          display: flex;
          justify-content: flex-end;
          pointer-events: none;
        }
        .pd-overlay.open { pointer-events: all; }
        .pd-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .pd-overlay.open .pd-backdrop { opacity: 1; }
        .pd-drawer {
          position: relative;
          z-index: 10;
          background: #fff;
          height: 100%;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
          font-family: 'Lato', sans-serif;
        }
        .pd-overlay.open .pd-drawer { transform: translateX(0); }
        .pd-close {
          position: absolute;
          top: 14px; right: 14px;
          z-index: 20;
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.2s;
        }
        .pd-close:hover { background: #f5f3f0; }
        .pd-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f5eae8;
          overflow: hidden;
          flex-shrink: 0;
        }
        .pd-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .pd-carousel-btn {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.85);
          border: none; border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 5; color: #1a1a1a;
          transition: background 0.2s;
        }
        .pd-carousel-btn:hover { background: #fff; }
        .pd-carousel-btn.prev { left: 12px; }
        .pd-carousel-btn.next { right: 12px; }
        .pd-dots {
          position: absolute;
          bottom: 12px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 5px;
        }
        .pd-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          border: none; cursor: pointer; padding: 0;
          transition: background 0.2s;
        }
        .pd-dot.active { background: #fff; }
        .pd-body {
          padding: 22px 24px 32px;
          display: flex; flex-direction: column;
          gap: 14px; flex: 1;
        }
        .pd-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem; font-weight: 600;
          color: #1a1a1a; margin: 0; line-height: 1.25;
        }
        .pd-price { font-size: 1rem; font-weight: 700; color: #1a1a1a; margin: 0; }
        .pd-price-note { font-size: 11.5px; color: #888; margin: 0; }
        .pd-price-note a { color: #888; text-decoration: underline; }
        .pd-divider { border: none; border-top: 1px solid #f0ece8; margin: 0; }
        .pd-features {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .pd-features li {
          font-size: 12.5px; color: #333; line-height: 1.55;
          display: flex; align-items: flex-start; gap: 6px;
        }
        .pd-features li::before {
          content: '✓'; color: #c0392b;
          font-weight: 700; flex-shrink: 0; margin-top: 1px;
        }
        .pd-flavours-label { font-size: 12.5px; color: #1a1a1a; margin: 0 0 8px; }
        .pd-flavours-label strong { font-weight: 700; }
        .pd-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .pd-chip {
          border: 1.5px solid #d5cfc9;
          border-radius: 9999px; padding: 7px 16px;
          font-size: 11.5px; font-weight: 600;
          color: #1a1a1a; background: #fff; cursor: pointer;
          font-family: 'Lato', sans-serif;
          transition: border-color 0.18s, background 0.18s;
        }
        .pd-chip:hover { border-color: #1a1a1a; }
        .pd-chip.selected { border-color: #1a1a1a; background: #1a1a1a; color: #fff; }
        .pd-actions { display: flex; gap: 10px; align-items: center; margin-top: 4px; }
        .pd-qty {
          display: flex; align-items: center;
          border: 1.5px solid #d5cfc9;
          border-radius: 9999px; overflow: hidden; flex-shrink: 0;
        }
        .pd-qty-btn {
          background: none; border: none;
          width: 36px; height: 42px; cursor: pointer;
          font-size: 18px; color: #1a1a1a;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Lato', sans-serif; transition: background 0.15s;
        }
        .pd-qty-btn:hover { background: #f5f3f0; }
        .pd-qty-num {
          min-width: 28px; text-align: center;
          font-size: 14px; font-weight: 600; color: #1a1a1a;
        }
        .pd-add-btn {
          flex: 1; background: #1a1a1a; color: #fff;
          border: none; border-radius: 9999px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.13em; padding: 14px;
          text-transform: uppercase; cursor: pointer;
          font-family: 'Lato', sans-serif;
          transition: background 0.2s;
        }
        .pd-add-btn:hover { background: #3d2b1f; }
        .pd-add-btn.added { background: #2e7d32; }
        .pd-add-btn.added:hover { background: #1b5e20; }
        .pd-buy-btn {
          width: 100%; background: #5a31f4; color: #fff;
          border: none; border-radius: 9999px;
          font-size: 13px; font-weight: 700; padding: 15px;
          cursor: pointer; font-family: 'Lato', sans-serif;
          transition: background 0.2s;
        }
        .pd-buy-btn:hover { background: #4520d4; }
        .pd-more-options {
          text-align: center; font-size: 12px; color: #888;
          text-decoration: underline; cursor: pointer;
          background: none; border: none;
          font-family: 'Lato', sans-serif;
        }
        .pd-desc { font-size: 12.5px; color: #444; line-height: 1.7; margin: 0; }
      `}</style>

      <div className={`pd-overlay${isOpen ? " open" : ""}`}>
        <div className="pd-backdrop" onClick={onClose} />
        <div className="pd-drawer">
          {product && (
            <>
              <button className="pd-close" onClick={onClose} aria-label="Close">
                <X size={16} />
              </button>

              <div className="pd-img-wrap">
                <img src={images[imgIndex]} alt={product.name} />
                {images.length > 1 && (
                  <>
                    <button
                      className="pd-carousel-btn prev"
                      onClick={() =>
                        setImgIndex(
                          (i) => (i - 1 + images.length) % images.length,
                        )
                      }
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      className="pd-carousel-btn next"
                      onClick={() =>
                        setImgIndex((i) => (i + 1) % images.length)
                      }
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="pd-dots">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          className={`pd-dot${i === imgIndex ? " active" : ""}`}
                          onClick={() => setImgIndex(i)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="pd-body">
                <h2 className="pd-name">{product.name}</h2>
                {/* Always show a clean formatted price */}
                <p className="pd-price">
                  {isNaN(numericPrice)
                    ? String(product.price)
                    : `$${numericPrice.toFixed(2)}`}
                </p>
                <p className="pd-price-note">
                  Tax included. <a href="#">Shipping</a> calculated at checkout.
                </p>

                <hr className="pd-divider" />

                {product.description && (
                  <p className="pd-desc">{product.description}</p>
                )}

                {product.features && product.features.length > 0 && (
                  <ul className="pd-features">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}

                <hr className="pd-divider" />

                <div>
                  <p className="pd-flavours-label">
                    Flavours: <strong>{activeFlavour}</strong>
                  </p>
                  <div className="pd-chips">
                    {flavours.map((f) => (
                      <button
                        key={f}
                        className={`pd-chip${activeFlavour === f ? " selected" : ""}`}
                        onClick={() => setSelectedFlavour(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="pd-divider" />

                <div className="pd-actions">
                  <div className="pd-qty">
                    <button
                      className="pd-qty-btn"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="pd-qty-num">{qty}</span>
                    <button
                      className="pd-qty-btn"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={`pd-add-btn${added ? " added" : ""}`}
                    onClick={() => {
                      if (added) return;
                      for (let i = 0; i < qty; i++) {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: numericPrice,
                          img: product.img,
                        });
                      }
                      setAdded(true);
                      setTimeout(() => setAdded(false), 2000);
                    }}
                  >
                    {added ? "✓ Added!" : "Add To Cart"}
                  </button>
                </div>

                <button className="pd-buy-btn">Buy with Shop Pay</button>
                <button className="pd-more-options">
                  More payment options
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
