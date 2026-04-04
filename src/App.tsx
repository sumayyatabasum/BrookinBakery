import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import CorporateGiftingPage from "./pages/CorporateGiftingPage";
import LocationsPage from "./pages/LocationsPage";
import MothersDayPage from "./pages/MothersDayPage";
import CookiesPage from "./pages/CookiesPage";
import MerchPage from "./pages/MerchPage";
import CardsCandilesPage from "./pages/CardsCandiles";
import BrowinesPage from "./pages/BrowinesPage";
import CakePage from "./pages/CakePage";
import CupCakesPage from "./pages/CupCakesPage";
import MacroonPage from "./pages/MacroonPage";
import ProductDrawer from "./components/ProductDrawer";
import { DrawerProvider, useDrawer } from "./context/DrawerContext";
import LoginPage from "./pages/LoginPage";
import { useLocation } from "react-router-dom";
import QuickViewPanel from "./components/QuickViewPanel";
function AppInner() {
  const { activeProduct, closeDrawer } = useDrawer();
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/collections/corporate-gifting"
          element={<CorporateGiftingPage />}
        />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collections/mothers-day" element={<MothersDayPage />} />
        <Route path="/collections/cookies" element={<CookiesPage />} />
        <Route path="/collections/merch" element={<MerchPage />} />
        <Route
          path="/collections/cards-candles"
          element={<CardsCandilesPage />}
        />
        <Route path="/collections/brownies" element={<BrowinesPage />} />
        <Route path="/collections/cakes" element={<CakePage />} />
        <Route path="/collections/cupcakes" element={<CupCakesPage />} />
        <Route path="/collections/macaroons" element={<MacroonPage />} />
      </Routes>

      <ProductDrawer product={activeProduct} onClose={closeDrawer} />
      <QuickViewPanel />

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return <AppInner />;
}

export default App;
