import PlantPromoSection from "../../components/PlantPromoCard";
import ShopPage from "../../components/dashboard/ShopPage";
import Showcase from "../../components/Showcase";
import BlogSection from "../../components/BlogSection";

const Home = () => {
  return (
    <div>
      <Showcase />
      <ShopPage />
      <PlantPromoSection />
      <BlogSection />
    </div>
  );
};

export default Home;
