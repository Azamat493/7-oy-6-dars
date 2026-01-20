import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PlantPromoSection from "../PlantPromoCard";
import ShopPage from "../ShopPage";
import Showcase from "../Showcase";

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
