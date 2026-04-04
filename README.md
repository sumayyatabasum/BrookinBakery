# 🍪 BrookinBakery

A fully responsive e-commerce web app inspired by [Brooki Bakehouse](https://www.brookibakehouse.com), built with React, TypeScript, and Vite. Features product browsing, a cart system, a product quick-view drawer, and multiple collection pages.

---

## ✨ Features

- **Multi-page routing** with React Router DOM
- **Product drawer** — slide-in panel with image carousel, flavour selection, quantity picker, and add-to-cart
- **Shopping cart** — persistent cart with quantity controls, free shipping progress bar, and pickup/delivery toggle
- **Pickup in store form** — date, collector name, contact number, and email fields
- **Animated navbar** — sticky nav with dropdown menus, marquee announcement bar, and slide-in search drawer
- **Collection pages** — Cookies, Brownies, Cakes, Cupcakes, Macarons, Merch, Cards & Candles, Corporate Gifting, Mother's Day
- **Hero section** — full-bleed background image with zoom animation on load
- **Product cards** — hover image swap, zoom effect, search icon (slides in from right), and "Choose Options" / "Add to Cart" button (slides up from bottom)
- **"You may also like"** suggestions on the cart page
- **Global context** — Cart, Drawer, and QuickView contexts for app-wide state

---

## 🗂️ Project Structure

```
src/
├── assets/                  # Product images and static assets
├── components/
│   ├── Navbar.tsx           # Sticky nav with dropdowns + search drawer
│   ├── Footer.tsx           # Site footer
│   ├── HeroSection.tsx      # Full-bleed hero with overlay text
│   ├── ProductGrid.tsx      # Tabbed product grid (Cookies / Brownies / Cakes)
│   ├── BestSellers.tsx
│   ├── MerchSection.tsx
│   ├── TrendingProducts.tsx
│   ├── FavouriteCookies.tsx
│   ├── Reviews.tsx
│   ├── OurStory.tsx
│   ├── PressAndStores.tsx
│   └── ProductDrawer.tsx    # Global slide-in product detail drawer
├── context/
│   ├── CartContext.tsx       # Cart state (add, remove, update qty)
│   ├── DrawerContext.tsx     # Product drawer open/close state
│   └── QuickViewContext.tsx  # Quick view panel state
├── pages/
│   ├── HomePage.tsx
│   ├── CartPage.tsx
│   ├── CorporateGiftingPage.tsx
│   ├── CookiesPage.tsx
│   ├── BrowinesPage.tsx
│   ├── CakePage.tsx
│   ├── CupCakesPage.tsx
│   ├── MacroonPage.tsx
│   ├── MerchPage.tsx
│   ├── CardsCandiles.tsx
│   ├── MothersDayPage.tsx
│   └── LocationsPage.tsx
├── App.tsx                  # Routes + DrawerProvider wrapper
├── main.tsx                 # App entry point with all providers
├── App.css
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sumayyatabasum/BrookinBakery.git

# Navigate into the project
cd BrookinBakery

# Install dependencies
npm install
```

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🛣️ Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/cart` | Shopping Cart |
| `/collections/corporate-gifting` | Corporate Gifting |
| `/collections/cookies` | Cookies |
| `/collections/brownies` | Brownies |
| `/collections/cakes` | Cakes |
| `/collections/cupcakes` | Cupcakes |
| `/collections/macaroons` | Macarons |
| `/collections/merch` | Merch |
| `/collections/cards-candles` | Cards & Candles |
| `/collections/mothers-day` | Mother's Day |
| `/locations` | Locations |

---

## 🧩 Key Components

### `ProductDrawer`
A global right-side slide-in drawer triggered from any product card via `useDrawer()`. Displays:
- Image carousel with dot navigation
- Product name, price, and tax note
- Description and feature checklist
- Flavour selector chips
- Quantity picker + Add to Cart button (with green confirmation state)
- Shop Pay button

### `CartPage`
- Free shipping progress bar (unlocks at $80)
- Product table with quantity controls and remove
- Shipping / Pickup In Store toggle
- Pickup form (date, name, contact, email) that animates in on toggle
- Order summary with estimated total and checkout button
- "You may also like" suggestion cards

### `Navbar`
- Marquee announcement bar (pink, Easter/seasonal message)
- Logo, centered nav links with dropdown menus
- Right-side icons: Search (slide-in drawer), Account, Cart
- Sticky + `z-index: 999`

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| React Router DOM | Client-side routing |
| Lucide React | Icons |
| CSS-in-JS (style tags) | Component-scoped styling |

---

## 🎨 Design Reference

Inspired by [Brooki Bakehouse](https://www.brookibakehouse.com).

**Fonts:** Playfair Display (headings), Lato (body)  
**Brand colours:** `#7B4F3A` (brown), `#ffd1dc` (pink), `#1a1a1a` (dark), `#f5eae8` (blush)

---

## 📸 Pages Preview

| Page | Description |
|---|---|
| Home | Hero + product tabs + reviews + our story + merch + trending + press |
| Corporate Gifting | Sidebar filters + 3-col product grid with hover animations |
| Cart | Full cart table + pickup form + suggestions |

---

## 👩‍💻 Author

**Sumayya Tabasum**  
GitHub: [@sumayyatabasum](https://github.com/sumayyatabasum)

---

## 📄 License

This project is for educational/portfolio purposes only. All brand imagery and design inspiration belongs to [Brooki Bakehouse](https://www.brookibakehouse.com).
