import { useState } from "react";
import { Slider, Skeleton } from "antd";
import { useQueryHandler } from "../../hooks/useQuery/UseQuery";
import type {
  CategoryType,
  ProductType,
  QueryType,
} from "../../@types/AuthType";
import { loaderApi } from "../../generic/loader/loaderApi";
import Card from "./Card";

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("house-plants");
  const [slider, setSlider] = useState<number[]>([0, 1000]);
  const { cateGoryLoader } = loaderApi();

  const changeSlider = (value: number[]) => setSlider(value);

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  }: QueryType<CategoryType[]> = useQueryHandler({
    url: "flower/category",
    pathname: "category",
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  }: QueryType<ProductType[]> = useQueryHandler({
    url: `flower/category/${activeCategory}`,
    pathname: `products/${activeCategory}`,
  });

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="w-[90%] max-w-[1550px] m-auto mt-10 mb-20 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[25%] bg-[#fbfbfb] p-4 rounded-md h-fit">
        <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
          Categories
        </h3>
        <div className="p-2 flex flex-col gap-5">
          {categoryLoading || categoryError
            ? cateGoryLoader()
            : categoryData?.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.route_path)}
                  className={`flex items-center justify-between cursor-pointer transition-colors
                    ${activeCategory === cat.route_path ? "text-[#46a358] font-bold" : "text-[#3d3d3d] hover:text-[#46a358]"}
                  `}
                >
                  <h3>{cat.title}</h3>
                  <span className="text-gray-400">({cat.count})</span>
                </div>
              ))}
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-[18px] text-[#3D3D3D] mb-4">
            Price Range
          </h3>
          <Slider
            range
            min={0}
            max={1000}
            value={slider}
            onChange={changeSlider}
            trackStyle={[{ backgroundColor: "#46A358" }]}
            handleStyle={[
              { borderColor: "#46A358", backgroundColor: "#46A358" },
              { borderColor: "#46A358", backgroundColor: "#46A358" },
            ]}
          />
          <p className="mt-2 text-[#3D3D3D]">
            Price:{" "}
            <span className="text-[#46A358] font-bold">
              {slider[0]}$ - {slider[1]}$
            </span>
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productsError ? (
          <p className="text-red-500 font-medium">Products not found 😕</p>
        ) : productsLoading ? (
          skeletons.map((_, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-md shadow-sm flex items-center justify-center h-[300px]"
            >
              <Skeleton.Image active style={{ width: 180, height: 180 }} />
            </div>
          ))
        ) : (
          productsData?.map((product) => (
            <Card key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ShopPage;
