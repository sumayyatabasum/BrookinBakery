import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Search, X, ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  children: string[];
}

interface NavItem {
  label: string;
  children: string[];
  href?: string;
}

const navItems: NavItem[] = [
  {
    label: "Delivery",
    children: ["Cookies", "Brownies", "Merch", "Cards & Candles"],
  },
  {
    label: "Pick Up",
    children: [
      "Cakes",
      "Cookies",
      "Cupcakes",
      "Brownies",
      "Macarons",
      "Candles & Cards",
      "Corporate Orders",
    ],
  },
  {
    label: "Corporate Gifting",
    children: [],
    href: "/collections/corporate-gifting",
  },
  { label: "Mother's Day", children: [] },
  { label: "Locations", children: [] },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <div
        className="overflow-hidden py-2"
        style={{ backgroundColor: "#ffd1dc" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee 30s linear infinite",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="mx-10 text-xs font-semibold tracking-widest"
              style={{ color: "black" }}
            >
              EASTER BREAK:Order placed 1-6 April will be shipped 7 April🐰
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nav-link-underline {
          position: relative;
          display: inline-block;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1.5px;
          background-color: #7B4F3A;
          transition: width 0.25s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          width: 100%;
        }
        .dropdown-link-underline {
          position: relative;
          display: inline-block;
        }
        .dropdown-link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 1px;
          background-color: #7B4F3A;
          transition: width 0.2s ease;
        }
        .dropdown-link-underline:hover::after {
          width: 100%;
        }
        .search-panel {
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .search-panel.open {
          transform: translateX(0);
        }
      `}</style>

      <nav
        ref={navRef}
        className="bg-white border-b px-8 py-8 flex items-center justify-between relative z-40 sticky top-0"
        style={{ borderColor: "#e8e0d8", zIndex: 999 }}
      >
        <a
          href="/"
          className="font-display font-bold text-2xl tracking-tight"
          style={{ color: "#7B4F3A", letterSpacing: "-0.01em" }}
        >
          BROOKI
          <sup style={{ fontSize: "10px", verticalAlign: "super" }}>®</sup>
        </a>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.children.length === 0 ? (
                <a
                  href={
                    item.label === "Corporate Gifting"
                      ? "/collections/corporate-gifting"
                      : "#"
                  }
                  onClick={() => {
                    if (item.label === "Locations")
                      window.location.href = "/locations";
                    if (item.label === "Mother's Day")
                      window.location.href = "/collections/mothers-day";
                  }}
                  style={{
                    color: "#3d2b1f",
                    fontWeight: 400,
                    fontSize: "14px",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                  }}
                >
                  <span className="nav-link-underline">{item.label}</span>
                </a>
              ) : (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex flex-row items-center gap-1"
                  style={{
                    color: "#3d2b1f",
                    fontWeight: 400,
                    fontSize: "14px",
                    letterSpacing: "0.01em",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  <span
                    className={`nav-link-underline${activeDropdown === item.label ? " active" : ""}`}
                  >
                    {item.label}
                  </span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform:
                        activeDropdown === item.label
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      marginLeft: "2px",
                      flexShrink: 0,
                    }}
                  />
                </button>
              )}

              {item.children.length > 0 && activeDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-xl py-3 z-50"
                  style={{
                    minWidth: "180px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {item.children.map((child) => {
                    let link = "#";

                    if (child === "Cookies") link = "/collections/cookies";
                    if (child === "Brownies") link = "/collections/brownies";
                    if (child === "Merch") link = "/collections/merch";
                    if (
                      child === "Cards & Candles" ||
                      child === "Candles & Cards"
                    )
                      link = "/collections/cards-candles";
                    if (child === "Cakes") link = "/collections/cakes";
                    if (child === "Corporate Orders")
                      link = "/collections/corporate-gifting";
                    if (child === "Cupcakes") link = "/collections/cupcakes";
                    if (child === "Macarons") link = "/collections/macaroons";
                    return (
                      <a
                        key={child}
                        href={link}
                        className="block px-6 py-2.5 text-sm"
                        style={{ color: "#3d2b1f" }}
                      >
                        <span className="dropdown-link-underline">{child}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            className="hover:opacity-60 transition-opacity"
            style={{ color: "#3d2b1f" }}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <a
            href="/login"
            className="hover:opacity-60 transition-opacity"
            style={{ color: "#3d2b1f" }}
            aria-label="Account"
          >
            <User size={20} />
          </a>
          <a
            href="/cart"
            className="relative hover:opacity-60 transition-opacity"
            style={{ color: "#3d2b1f" }}
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
          </a>
        </div>
      </nav>

      <style>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          pointer-events: none;
        }
        .search-overlay.open {
          pointer-events: all;
        }

        .search-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          opacity: 0;
          transition: opacity 2s ease;
        }
        .search-overlay.open .search-backdrop {
          opacity: 1;
        }

        .search-drawer {
          position: relative;
          z-index: 10;
          background: #fff;
          height: 100%;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          padding: 36px 32px;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .search-overlay.open .search-drawer {
          transform: translateX(0%);
        }
      `}</style>

      <div className={`search-overlay${searchOpen ? " open" : ""}`}>
        <div className="search-backdrop" onClick={() => setSearchOpen(false)} />
        <div ref={searchRef} className="search-drawer">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl" style={{ color: "#3d2b1f" }}>
              Search
            </h2>
            <button
              onClick={() => setSearchOpen(false)}
              className="hover:opacity-60 transition-opacity"
              style={{ color: "#3d2b1f" }}
            >
              <X size={22} />
            </button>
          </div>
          <div
            className="flex items-center gap-3 rounded-full px-4 py-3"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            <Search size={18} style={{ color: "#888" }} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
              className="bg-transparent outline-none text-sm w-full"
              style={{ color: "#3d2b1f" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
