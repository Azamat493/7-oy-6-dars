import CartTotal from "./card-total/CartTotal";
import Shopping from "./shopping/Shopping";

const ProductsShop = () => {
  return (
    <div className="w-[95%] md:w-[90%] max-w-[1550px] m-auto mt-6 md:mt-10 mb-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
       
        <div className="w-full lg:w-[65%]">
          <Shopping />
        </div>

  
        <div className="w-full lg:w-[35%]">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default ProductsShop;