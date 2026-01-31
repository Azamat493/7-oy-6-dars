import { useEffect, useState } from "react";
import { Skeleton, Empty } from "antd";
import { useQueryHandler } from "../../hooks/useQuery/UseQuery";
import type { ProductType } from "../../@types/AuthType";
import Card from "../dashboard/Card";

const MyProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const targetIds = ["68035921f2a99d0247955fc4", "66d8016d1acc9b0ff58b0e0d"];

  const { data: housePlantsData, isLoading: load1 } = useQueryHandler({
    url: "flower/category/house-plants",
    pathname: "category-house-plants",
  });

  const { data: smallPlantsData, isLoading: load2 } = useQueryHandler({
    url: "flower/category/small-plants",
    pathname: "category-small-plants",
  });

  useEffect(() => {
    const list1: ProductType[] = Array.isArray(housePlantsData)
      ? housePlantsData
      : [];
    const list2: ProductType[] = Array.isArray(smallPlantsData)
      ? smallPlantsData
      : [];

    const allProducts = [...list1, ...list2];

    const filtered = allProducts.filter((p) => targetIds.includes(p._id));

    setProducts(filtered);
  }, [housePlantsData, smallPlantsData]);

  const isLoading = load1 || load2;
  const skeletons = Array.from({ length: 2 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletons.map((_, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <Skeleton.Image active style={{ width: "100%", height: 300 }} />
            <div className="flex justify-between mt-2">
              <Skeleton.Input active size="small" style={{ width: "60%" }} />
              <Skeleton.Input active size="small" style={{ width: "30%" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className=" mb-20 w-full">
   

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <Empty description="Tanlangan gullar topilmadi (ID yoki Kategoriya xato bo'lishi mumkin)" />
      )}
    </div>
  );
};

export default MyProducts;
