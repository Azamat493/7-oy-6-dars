import { Slider, Select } from "antd";
import { Heart, Search, ShoppingCart } from "lucide-react";
import zfvoenzgd from "../assets/images/zfvoenzgd.webp";
import qeoau from "../assets/images/qeoau.webp";
import njkema9 from "../assets/images/njkema9.webp";
import DSC0331 from "../assets/images/DSC0331.webp";
import u8hg from "../assets/images/u8hg.jpg";
import bromeliads from "../assets/images/bromeliads.png";

const products = [
  {
    id: 1,
    name: "Barberton Daisy",
    price: 12,
    oldPrice: 14,
    image: zfvoenzgd,
  },
  {
    id: 2,
    name: "Peace Lil",
    price: 29.99,
    oldPrice: 32,
    image: qeoau,
  },
  {
    id: 3,
    name: "Monstera Deliciosat",
    price: 35.99,
    oldPrice: 45.99,
    image: njkema9,
  },
  {
    id: 4,
    name: "Beach Spider Lily",
    price: 222,
    oldPrice: 250,
    image: u8hg,
  },
  {
    id: 5,
    name: "Motif",
    price: 900,
    oldPrice: 1000,
    image: DSC0331,
  },
];

const categories = [
  { name: "House Plants", count: 33 },
  { name: "Potter Plants", count: 12 },
  { name: "Seeds", count: 65 },
  { name: "Small Plants", count: 39 },
  { name: "Big Plants", count: 23 },
  { name: "Succulents", count: 17 },
  { name: "Trerrariums", count: 19 },
  { name: "Gardening", count: 13 },
  { name: "Accessories", count: 18 },
];

const ShopPage = () => {
  return (
    <div className="w-[90%] m-auto mt-10 mb-20 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[25%] bg-[#fbfbfb] p-4 rounded-md h-fit">
        <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
          Categories
        </h3>
        <ul className="flex flex-col gap-3 pl-3">
          {categories.map((cat, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer transition-colors"
            >
              <span>{cat.name}</span>
              <span>({cat.count})</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
            Price Range
          </h3>
          <Slider
            range
            defaultValue={[20, 80]}
            trackStyle={[{ backgroundColor: "#46A358" }]}
            handleStyle={[
              { borderColor: "#46A358", backgroundColor: "#46A358" },
              { borderColor: "#46A358", backgroundColor: "#46A358" },
            ]}
          />
          <p className="mt-2 text-[#3D3D3D]">
            Price: <span className="text-[#46A358] font-bold">$20 - $80</span>
          </p>
          <button className="mt-4 cursor-pointer w-full bg-[#46A358] text-white px-6 py-2 rounded-md font-bold hover:bg-[#357a40] transition-colors">
            Filter
          </button>
        </div>

        <div className="mt-8 w-full   flex flex-col items-center justify-center text-center relative overflow-hidden">
          <h2 className="text-[#46A358] leading-[100%] mb-3 font-bold text-[30px] z-10">
            Do not miss the opportunity!
          </h2>
          <p className="text-[#3D3D3D] font-bold text-[20px] z-10">
            UP TO 52% OFF
          </p>
          <img
            src={bromeliads}
            alt="Super Sale"
            className="lg:w-full w-full sm:w-[60%] h-full"
          />
        </div>
      </div>

      <div className="w-full lg:w-[75%]">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex gap-6 text-[#3D3D3D]">
            <span className="cursor-pointer font-bold text-[#46A358] border-b-2 border-[#46A358] pb-1">
              All Plants
            </span>
            <span className="cursor-pointer hover:text-[#46A358]">
              New Arrivals
            </span>
            <span className="cursor-pointer hover:text-[#46A358]">Sale</span>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span>Sort by:</span>
            <Select
              defaultValue="default"
              style={{ width: 150 }}
              options={[
                { value: "default", label: "Default Sorting" },
                { value: "price_low", label: "The Cheapest" },
                { value: "price_high", label: "Most Expensive" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="group">
      {" "}
      <div className="relative w-full h-[300px] bg-[#FBFBFB] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-t-[2px] group-hover:border-[#46A358]">
        <img
          src={product.image}
          alt={product.name}
          className="w-[80%] h-[80%] object-contain mix-blend-multiply"
        />

        <div className="absolute -bottom-10 group-hover:bottom-6 left-1/2 -translate-x-1/2 flex gap-4 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
          <div className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer shadow-md hover:translate-y-[-2px] transition-all">
            <ShoppingCart size={20} />
          </div>

          <div className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer shadow-md hover:translate-y-[-2px] transition-all">
            <Heart size={20} />
          </div>

          <div className="w-[35px] h-[35px] bg-white rounded-md flex items-center justify-center text-[#3D3D3D] hover:text-[#46A358] cursor-pointer shadow-md hover:translate-y-[-2px] transition-all">
            <Search size={20} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center lg:items-start">
        <h3 className="text-[#3D3D3D]  text-[16px] font-normal">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[#46A358] font-bold text-[16px]">
            {product.price.toFixed(2)}$
          </span>
          {product.oldPrice && (
            <span className="text-[#A5A5A5] text-[14px] line-through">
              {product.oldPrice.toFixed(2)}$
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
