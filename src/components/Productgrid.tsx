import { useState } from "react";
import { Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useQuickView } from "../context/QuickViewContext";
import { useDrawer } from "../context/DrawerContext";

interface Product {
  name: string;
  price: string;
  img: string;
  hoverImg: string | null;
  badge?: string;
  addToCart?: boolean;
}

const ASSET = (name: string) => `/src/assets/body/${name}.png`;

const tabs = ["Cookies", "Brownies", "Cakes"] as const;
type Tab = (typeof tabs)[number];

const products: Record<Tab, Product[]> = {
  Cookies: [
    {
      name: "Best Sellers",
      price: "$40.00",
      img: ASSET("cook-1"),
      hoverImg: ASSET("cookie-1"),
    },
    {
      name: "Cookie Tube",
      price: "$20.00",
      img: ASSET("cook-2"),
      hoverImg: ASSET("cookie-2"),
    },
    {
      name: "Mini Cookie Catering",
      price: "$50.00",
      img: ASSET("cook-3"),
      hoverImg: ASSET("cookie-3"),
    },
    {
      name: "Mini Cookies",
      price: "$42.00",
      img: ASSET("cook-4"),
      hoverImg: ASSET("cookie-4"),
    },
    {
      name: "Build a Box",
      price: "$48.00",
      img: ASSET("cook-5"),
      hoverImg: ASSET("cookie-5"),
    },
    {
      name: "Mystery Box",
      price: "$40.00",
      img: ASSET("cookie-6"),
      hoverImg: ASSET("cookie-6"),
      addToCart: true,
    },
  ],
  Brownies: [
    {
      name: "Message Brownie",
      price: "$60.00",
      img: ASSET("browine-1"),
      hoverImg: ASSET("brook-1"),
    },
    {
      name: "Brownie Slab",
      price: "From $45.00",
      img: ASSET("browine-2"),
      hoverImg: ASSET("brook-2"),
    },
    {
      name: "Brownie Box of 6",
      price: "$70.00",
      img: ASSET("browine-3"),
      hoverImg: ASSET("brook-3"),
      addToCart: true,
    },
  ],
  Cakes: [
    {
      name: "Vintage Heart Cakes",
      price: "From $150.00",
      img: ASSET("cake-1"),
      hoverImg: ASSET("caki-1"),
    },
    {
      name: "Vintage Round Cake",
      price: "From $120.00",
      img: ASSET("cake-2"),
      hoverImg: null,
    },
    {
      name: "Naked Cakes",
      price: "$75.00",
      img: ASSET("cake-3"),
      hoverImg: ASSET("caki-3"),
    },
    {
      name: "Mini Hearts Cakes",
      price: "From $45.00",
      img: ASSET("cake-4"),
      hoverImg: ASSET("caki-4"),
    },
    {
      name: "Mini cake",
      price: "From $45.00",
      img: ASSET("cake-5"),
      hoverImg: ASSET("caki-5"),
    },
    {
      name: "Gender Reveal Cake",
      price: "$130.00",
      img: ASSET("cake-6"),
      hoverImg: ASSET("caki-6"),
    },
    {
      name: "Logo Cupcakes",
      price: "From $192.00",
      img: ASSET("cake-7"),
      hoverImg: null,
    },
    {
      name: "Cupcakes",
      price: "From $35.00",
      img: ASSET("cake-8"),
      hoverImg: null,
    },
  ],
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const { open } = useQuickView();
  const { openDrawer } = useDrawer();

  return (
    <div
      className="product-card"
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-img-wrap">
        <img
          src={product.img}
          alt={product.name}
          className="card-img base-img"
          style={{ opacity: hovered && product.hoverImg ? 0 : 1 }}
        />

        {product.hoverImg && (
          <img
            src={product.hoverImg}
            alt={product.name}
            className={`card-img hover-img${hovered ? " zooming" : ""}`}
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {product.badge && (
          <div className="card-badge">
            <span>{product.badge}</span>
          </div>
        )}

        <div className={`card-overlay${hovered ? " visible" : ""}`}>
          <div className="overlay-actions">
            <button
              className="overlay-main-btn"
              onClick={() => {
                if (product.addToCart) {
                  addToCart({
                    id: product.name,
                    name: product.name,
                    price: parseFloat(product.price.replace(/[^0-9.]/g, "")),
                    img: product.img,
                  });
                } else {
                  openDrawer({
                    id: product.name,
                    name: product.name,
                    price: parseFloat(product.price.replace(/[^0-9.]/g, "")),
                    img: product.img,
                    images: [product.img, product.hoverImg || product.img],
                    description:
                      "The most instagrammed moment at your wedding, event, or office morning tea. Fifteen individually wrapped mini Brooki cookies.",
                    features: [
                      "15 individually wrapped cookies",
                      "Perfect bite-sized treats",
                      "Fully labelled with ingredients",
                      "Signature packaging",
                    ],
                    flavours: ["Best Sellers", "Choc Chip", "Red Velvet"],
                  });
                }
              }}
            >
              {product.addToCart ? "Add to Cart" : "Choose Options"}
            </button>
            <button
              className="overlay-icon-btn"
              aria-label="Quick view"
              onClick={() =>
                open({
                  id: product.name,
                  name: product.name,
                  price: product.price,
                  img: product.img,
                  hoverImg: product.hoverImg,
                  badge: product.badge,
                })
              }
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="card-info">
        <p className="card-name">{product.name}</p>
        <p className="card-price">{product.price}</p>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("Cookies");
  const [tabKey, setTabKey] = useState(0);

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setTabKey((k) => k + 1);
  };

  return (
    <>
      <style>{`
        .product-section {
          background: #fff;
          padding: 52px 36px 72px;
          font-family: 'Lato', sans-serif;
        }

        .tab-row {
          display: flex;
          align-items: baseline;
          gap: 28px;
          margin-bottom: 28px;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 0 0 5px;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #c0b8b0;
          position: relative;
          transition: color 0.22s ease;
          letter-spacing: -0.01em;
        }
        .tab-btn.active { color: #1a1a1a; }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: #1a1a1a;
          transition: width 0.25s ease;
        }
        .tab-btn.active::after { width: 100%; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }

        @keyframes cardUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-card {
          animation: cardUp 0.42s ease both;
          cursor: pointer;
          border-radius: 14px;
          overflow: hidden;
          background: #f7f4f2;
          display: flex;
          flex-direction: column;
        }

        .card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 118%;
          overflow: hidden;
          border-radius: 14px 14px 0 0;
          background: #eddde8;
        }

        .card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity 0.35s ease;
        }
        .base-img  { z-index: 1; }
        .hover-img { z-index: 2; transform: scale(1.1); }

        @keyframes zoomOut {
          from { transform: scale(1.1); }
          to   { transform: scale(1.0); }
        }
        .hover-img.zooming {
          animation: zoomOut 1s ease forwards;
        }

        .card-badge {
          position: absolute;
          top: 9px; right: 9px;
          z-index: 10;
          background: #2a1710;
          color: #fff;
          border-radius: 50%;
          width: 48px; height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .card-badge span {
          font-size: 7.5px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.28s ease;
          pointer-events: none;
          background: linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 55%);
        }
        .card-overlay.visible {
          opacity: 1;
          pointer-events: all;
        }
        .overlay-actions {
          position: absolute;
          inset: 0;
        }
        .overlay-icon-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 34px; height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a1a1a;
          transition: background 0.18s ease, color 0.18s ease;
        }
          
        .overlay-icon-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }
        .overlay-main-btn {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
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
          transition: background 0.18s ease, color 0.18s ease;
        }
        .overlay-main-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .card-info {
          padding: 14px 14px 18px;
          background: #faf9f8;
          flex: 1;
        }
        .card-name {
          font-size: 14.5px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 6px;
        }
        .card-price {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        @media (max-width: 1100px) {
          .product-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 720px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); }
          .product-section { padding: 32px 16px 48px; }
        }
      `}</style>

      <section className="product-section">
        <div className="tab-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn${activeTab === tab ? " active" : ""}`}
              onClick={() => switchTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div key={tabKey} className="product-grid">
          {products[activeTab].map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
