import Header from "../../components/header/Header";
import PlantPromoSection from "../PlantPromoCard";
import ShopPage from "../ShopPage";
import Showcase from "../Showcase";

const Home = () => {
  return (
    <div>
      <Header />
      <Showcase/>
      <ShopPage/>
      <PlantPromoSection/>
    </div>
  );
};

export default Home;
