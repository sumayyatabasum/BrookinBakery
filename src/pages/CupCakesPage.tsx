import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useQuickView } from "../context/QuickViewContext";
import { useDrawer } from "../context/DrawerContext";

interface Product {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  img: string;
  hoverImg: string;
  inStock: boolean;
}

const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cupcakes",
    price: 35,
    priceLabel: "From $35.00",
    img: "/src/assets/body/cake-8.png",
    hoverImg: "/src/assets/body/cake-7.png",
    inStock: true,
  },
  {
    id: "2",
    name: "Vanilla Cupcakes",
    price: 35,
    priceLabel: "From $35.00",
    img: "/src/assets/body/cake-11.png",
    hoverImg: "/src/assets/body/caki-11.png",
    inStock: true,
  },
  {
    id: "3",
    name: "Logo Cupcakes",
    price: 192,
    priceLabel: "From $192.00",
    img: "/src/assets/body/cake-7.png",
    hoverImg: "/src/assets/body/cake-7.png",
    inStock: true,
  },
  {
    id: "4",
    name: "Red velvet Cupcakes",
    price: 35,
    priceLabel: "From $35.00",
    img: "/src/assets/body/cake-10.png",
    hoverImg: "/src/assets/body/caki-10.png",
    inStock: true,
  },
  {
    id: "5",
    name: "Chocolate Cupcakes",
    price: 35,
    priceLabel: "From $35.00",
    img: "/src/assets/body/cake-12.png",
    hoverImg: "/src/assets/body/cake-12.png",
    inStock: true,
  },
  {
    id: "6",
    name: "Oreo Cupcakes",
    price: 35,
    priceLabel: "From $35.00",
    img: "/src/assets/body/cake-9.png",
    hoverImg: "/src/assets/body/caki-9.png",
    inStock: true,
  },
  {
    id: "7",
    name: "Nutella Cupcakes",
    price: 35,
    priceLabel: "From $35.00",
    img: "/src/assets/body/cake-13.png",
    hoverImg: "/src/assets/body/cake-13.png",
    inStock: true,
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best", label: "Best selling" },
  { value: "a-z", label: "Alphabetically, A-Z" },
  { value: "z-a", label: "Alphabetically, Z-A" },
  { value: "price-low", label: "Price, low to high" },
  { value: "price-high", label: "Price, high to low" },
  { value: "date-old", label: "Date, old to new" },
  { value: "date-new", label: "Date, new to old" },
];

const MAX_PRICE = 192;

export default function CupCakesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterOutStock, setFilterOutStock] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [availOpen, setAvailOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { open } = useQuickView();
  const { openDrawer } = useDrawer();

  const activeFilterCount =
    (filterInStock ? 1 : 0) +
    (filterOutStock ? 1 : 0) +
    (minPrice > 0 || maxPrice < MAX_PRICE ? 1 : 0);

  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      if (filterInStock && !filterOutStock && !p.inStock) return false;
      if (filterOutStock && !filterInStock && p.inStock) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      return true;
    });
  }, [filterInStock, filterOutStock, minPrice, maxPrice]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "a-z":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "price-low":
        return arr.sort((a, b) => a.price - b.price);
      case "price-high":
        return arr.sort((a, b) => b.price - a.price);
      default:
        return arr;
    }
  }, [filtered, sortBy]);

  const resetFilters = () => {
    setFilterInStock(false);
    setFilterOutStock(false);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
  };

  const SidebarContent = () => (
    <>
      <div className="cg-filter-section">
        <button
          className="cg-filter-header"
          onClick={() => setAvailOpen((o) => !o)}
        >
          <span>Availability</span>
          {availOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {availOpen && (
          <div className="cg-filter-body">
            <label className="cg-check-label">
              <input
                type="checkbox"
                checked={filterInStock}
                onChange={() => setFilterInStock((v) => !v)}
              />
              In stock ({ALL_PRODUCTS.filter((p) => p.inStock).length})
            </label>
            <label className="cg-check-label">
              <input
                type="checkbox"
                checked={filterOutStock}
                onChange={() => setFilterOutStock((v) => !v)}
              />
              Out of stock ({ALL_PRODUCTS.filter((p) => !p.inStock).length})
            </label>
          </div>
        )}
      </div>
      <div className="cg-filter-section cg-availability">
        <button
          className="cg-filter-header"
          onClick={() => setPriceOpen((o) => !o)}
        >
          <span>Price</span>
          {priceOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {priceOpen && (
          <div className="cg-filter-body">
            <input
              type="range"
              className="cg-price-slider"
              min={0}
              max={MAX_PRICE}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

            <div className="cg-price-inputs">
              <div className="cg-price-input-wrap">
                <span>$</span>
                <input
                  type="number"
                  value={minPrice}
                  min={0}
                  max={maxPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(Number(e.target.value), maxPrice))
                  }
                />
              </div>
              <span className="cg-price-to">To</span>
              <div className="cg-price-input-wrap">
                <span>$</span>
                <input
                  type="number"
                  value={maxPrice}
                  min={minPrice}
                  max={MAX_PRICE}
                  onChange={(e) =>
                    setMaxPrice(Math.max(Number(e.target.value), minPrice))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {activeFilterCount > 0 && (
        <button className="cg-reset-btn" onClick={resetFilters}>
          Clear all filters
        </button>
      )}
    </>
  );

  return (
    <>
      <style>{`
        .cg-page {
          font-family: 'Lato', sans-serif;
          background: #fff;
          min-height: 80vh;
          color: #1a1a1a;
        }


        .cg-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          max-width: 1250px;
          margin: 0 auto;
          padding: 28px 40px 80px;
          align-items: start;
        }

        .cg-sidebar {
          padding-right: 28px;
          border-right: 5px solid #f0ece8;
          position: sticky;
          top: 100px;
        }

        .cg-filter-section {
          margin-bottom: 24px;
          border-bottom: 1px solid #f0ece8;
          padding-bottom: 20px;
        }
        .cg-filter-section:last-of-type {
          border-bottom: none;
        }

        .cg-filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #1a1a1a;
          margin-bottom: 12px;
          padding: 0;
          font-family: 'Lato', sans-serif;
          text-align: left;
        }

        .cg-filter-body {
          padding-top: 4px;
        }

        .cg-check-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #444;
          margin-bottom: 10px;
          cursor: pointer;
          line-height: 1.4;
        }
        .cg-check-label:hover { color: #1a1a1a; }
        .cg-check-label input[type="checkbox"] {
          accent-color: #1a1a1a;
          width: 14px; height: 14px;
          cursor: pointer; flex-shrink: 0;
        }

        .cg-price-slider {
          width: 100%;
          accent-color: #1a1a1a;
          margin: 4px 0 12px;
          cursor: pointer;
        }
        .cg-price-inputs {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cg-price-input-wrap {
          display: flex;
          align-items: center;
          border: 1px solid #d5cfc9;
          border-radius: 8px;
          padding: 6px 10px;
          flex: 1;
          transition: border-color 0.2s;
        }
        .cg-price-input-wrap:focus-within { border-color: #1a1a1a; }
        .cg-price-input-wrap span { font-size: 12px; color: #888; margin-right: 3px; }
        .cg-price-input-wrap input {
          border: none; outline: none;
          font-size: 12.5px; color: #1a1a1a;
          width: 100%; background: transparent;
          font-family: 'Lato', sans-serif;
        }
        .cg-price-to { font-size: 12px; color: #888; flex-shrink: 0; }

        .cg-reset-btn {
          background: none; border: none; cursor: pointer;
          font-size: 12px; color: #888; text-decoration: underline;
          font-family: 'Lato', sans-serif; padding: 0; margin-top: 4px;
          transition: color 0.2s;
        }
        .cg-reset-btn:hover { color: #1a1a1a; }

        .cg-main { padding-left: 36px; }

        .cg-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0ece8;
        }

        .cg-count { font-size: 13px; color: black; }

        .cg-sort {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #1a1a1a;
        }
        .cg-sort-label { color: black; }
        .cg-sort select {
          border: none; outline: none;
          font-size: 13px; font-family: 'Lato', sans-serif;
          color: #1a1a1a; background: transparent; cursor: pointer;
          font-weight: 500;
        }

        .cg-mobile-filter-btn {
          display: none;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid #d5cfc9;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          font-family: 'Lato', sans-serif;
          cursor: pointer;
          color: #1a1a1a;
        }

        .cg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .cg-empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 0;
          color: #888;
          font-size: 14px;
        }
        .cg-empty-state h3 {
          font-size: 1.1rem;
          color: #1a1a1a;
          margin: 0 0 8px;
        }

        .cg-card {
          border-radius: 16px;
          margin: 6px;
          overflow: hidden;
          background: #f2f2f2;
          cursor: pointer;
        }

        .cg-card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 140%;
          overflow: hidden;
          border-radius-top: 16px;
          background: #f5eae8;
        }

        .cg-card-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: transform 0.7s ease, opacity 0.4s ease;
        }
        .cg-card-img.hover-img { opacity: 0; }
        .cg-card:hover .cg-card-img.base-img  { opacity: 0;  transform: scale(1.05); }
        .cg-card:hover .cg-card-img.hover-img { opacity: 1;  transform: scale(1.05); }

        .cg-search-btn {
          position: absolute;
          top: 12px; right: 12px; z-index: 10;
          background: #fff; border: none; border-radius: 50%;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          opacity: 0; transform: translateX(12px);
          transition: opacity 0.25s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .cg-card:hover .cg-search-btn {
          opacity: 1; transform: translateX(0);
          pointer-events: all;
        }
        .cg-search-btn:hover { background: #1a1a1a; color: #fff; }

        .cg-choose-btn-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 16px 16px; z-index: 10;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.28s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .cg-card:hover .cg-choose-btn-wrap {
          opacity: 1; transform: translateY(0);
          pointer-events: all;
        }
        .cg-choose-btn {
          width: 100%; background: #fff; border: none;
          border-radius: 9999px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; padding: 13px; text-transform: uppercase;
          cursor: pointer; font-family: 'Lato', sans-serif; color: #1a1a1a;
          transition: background 0.2s, color 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
        }
        .cg-choose-btn:hover { background: #1a1a1a; color: #fff; }

        .cg-card-info { padding: 14px 14px 28px; }
        .cg-card-name {
          font-size: 17px; font-weight: 500;
          color: #1a1a1a; margin: 0 0 5px;
        }
        .cg-card-price { font-size: 14px; color: #1a1a1a; margin: 0; font-weight: 950; }

        .cg-filter-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          border-radius: 50%;
          width: 18px; height: 18px;
          font-size: 10px;
          font-weight: 700;
          margin-left: 6px;
        }

        @media (max-width: 900px) {
          .cg-layout { grid-template-columns: 1fr; padding: 24px 20px 60px; }
          .cg-sidebar { display: none; }
          .cg-sidebar.open { display: block; position: static; border-right: none; border-bottom: 1px solid #f0ece8; padding: 0 0 24px; margin-bottom: 24px; }
          .cg-main { padding-left: 0; }
          .cg-grid { grid-template-columns: repeat(2, 1fr); }
          .cg-mobile-filter-btn { display: flex; }
          .cg-page-title { padding: 32px 20px 0; }
        }

        @media (max-width: 500px) {
          .cg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cg-page">
        <div className="cg-layout">
          <aside className={`cg-sidebar${mobileFilterOpen ? " open" : ""}`}>
            <SidebarContent />
          </aside>

          <main className="cg-main">
            <div className="cg-top-bar">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  className="cg-mobile-filter-btn"
                  onClick={() => setMobileFilterOpen((o) => !o)}
                >
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="cg-filter-badge">{activeFilterCount}</span>
                  )}
                </button>
                <span className="cg-count">
                  {sorted.length} product{sorted.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="cg-sort">
                <span className="cg-sort-label">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cg-grid">
              {sorted.length === 0 ? (
                <div className="cg-empty-state">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters.</p>
                  <button
                    className="cg-reset-btn"
                    onClick={resetFilters}
                    style={{ fontSize: 13 }}
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                sorted.map((p) => (
                  <div
                    key={p.id}
                    className="cg-card"
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="cg-card-img-wrap">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="cg-card-img base-img"
                        draggable={false}
                      />
                      <img
                        src={p.hoverImg}
                        alt={p.name}
                        className="cg-card-img hover-img"
                        draggable={false}
                      />

                      <button
                        className="cg-search-btn"
                        aria-label="Quick view"
                        onClick={() =>
                          open({
                            id: p.id,
                            name: p.name,
                            price: p.priceLabel,
                            img: p.img,
                            hoverImg: p.hoverImg,
                          })
                        }
                      >
                        <Search size={15} />
                      </button>

                      <div className="cg-choose-btn-wrap">
                        <button
                          className="cg-choose-btn"
                          onClick={() =>
                            openDrawer({
                              id: p.id,
                              name: p.name,
                              price: 175,
                              img: p.img,
                              images: [p.img, p.hoverImg],
                              description:
                                "The most instagrammed moment at your wedding, event, or office morning tea. Fifteen individually wrapped mini Brooki cookies, each one a perfectly sized hit of the real thing.",
                              features: [
                                "15 individually wrapped cookies in your chosen flavour",
                                "Each cookie is 50g — the perfect one-bite treat",
                                "Fully labelled with ingredients, allergens and additional info",
                                "Arrives in Brooki's signature pink packaging",
                              ],
                              flavours: [
                                "Best Sellers",
                                "Choc Chip",
                                "Red Velvet",
                                "Double Choc",
                              ],
                            })
                          }
                        >
                          Choose Options
                        </button>
                      </div>
                    </div>

                    <div className="cg-card-info">
                      <p className="cg-card-name">{p.name}</p>
                      <p className="cg-card-price">{p.priceLabel}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
