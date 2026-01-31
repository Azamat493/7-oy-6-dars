import { useState, useEffect } from "react";
import { Slider, Skeleton } from "antd";
import { useQueryHandler } from "../../hooks/useQuery/UseQuery";
import type {
  CategoryType,
  ProductType,
  QueryType,
} from "../../@types/AuthType";
import { loaderApi } from "../../generic/loader/loaderApi";
import Card from "./Card";
import { useSearchParamsHandler } from "../../hooks/paramsApi/paramsApi";
import ProductsTitle from "./products_title/ProductsTitleSection";
import Discount from "./Discount";

const ShopPage = () => {
  const { cateGoryLoader } = loaderApi();
  const { getParam, setParam } = useSearchParamsHandler();

  const range_max = Number(getParam("range_max")) || 1000;
  const range_min = Number(getParam("range_min")) || 0;
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort") || "default-sorting";
  const category = getParam("category") || "house-plants";

  const [slider, setSlider] = useState<number[]>([range_min, range_max]);

  useEffect(() => {
    if (slider[0] !== range_min || slider[1] !== range_max) {
      setSlider([range_min, range_max]);
    }
  }, [range_min, range_max]);

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
    url: `flower/category/${category}`,
    pathname: `products-${category}-${range_min}-${range_max}-${type}-${sort}`,
    param: {
      range_min,
      range_max,
      type,
      sort,
    },
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
                  onClick={() =>
                    setParam({
                      category: cat.route_path,
                      range_min,
                      range_max,
                      type,
                      sort,
                    })
                  }
                  className={`flex items-center justify-between cursor-pointer transition-colors
                    ${category === cat.route_path ? "text-[#46a358] font-bold" : "text-[#3d3d3d] hover:text-[#46a358]"}
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
        <button
          onClick={() =>
            setParam({
              category,
              range_min: slider[0],
              range_max: slider[1],
              type,
              sort,
            })
          }
          className="bg-[#46a358] w-full mt-2 rounded-lg font-medium text-white p-[7px_25px] cursor-pointer transition-all duration-300 hover:bg-[#367e42] hover:shadow-lg"
        >
          Filter
        </button>

        <Discount />
      </div>

      <div className="w-full lg:w-[75%]">
        <div className="mb-8">
          <ProductsTitle />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productsError ? (
            <p className="text-red-500 font-medium">Products not found 😕</p>
          ) : productsLoading ? (
            skeletons.map((_, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-md shadow-sm flex flex-col gap-2 items-center justify-center h-[300px]"
              >
                <Skeleton.Image active style={{ width: 180, height: 180 }} />
                <Skeleton.Input active />
              </div>
            ))
          ) : (
            productsData?.map((product) => (
          <Card key={product._id} product={product} />
        ))
      )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
