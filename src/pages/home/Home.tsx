import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlantPromoSection from "../../components/PlantPromoCard";
import ShopPage from "../../components/dashboard/ShopPage";
import Showcase from "../../components/Showcase";

const Home = () => {
  return (
    <div>
      <Header />
      <Showcase />
      <ShopPage />
      <PlantPromoSection />
      <Footer />
    </div>
  );
};

export default Home;
