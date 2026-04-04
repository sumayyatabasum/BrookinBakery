import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/Productgrid";
import Reviews from "../components/Reviews";
import OurStory from "../components/Ourstory";
import BestSellers from "../components/BestSellers";
import MerchSection from "../components/Merchsection";
import TrendingProducts from "../components/Trendingproducts";
import PressAndStores from "../components/Pressandstores";
import FavouriteCookies from "../components/Favouritecookies";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Reviews />
      <ProductGrid />
      <OurStory />
      <BestSellers />
      <MerchSection />
      <TrendingProducts />
      <PressAndStores />
      <FavouriteCookies />
      <Footer />
    </>
  );
}
