import type { DiscountFlowerType, QueryType } from "../../@types/AuthType";
import { useQueryHandler } from "../../hooks/useQuery/UseQuery";

const Discount = () => {
  const { data }: QueryType<DiscountFlowerType> = useQueryHandler({
    url: "features/discount",
    pathname: "discount",
  });
  return (
    <div className="flex flex-col justify-between items-center gap-2.5 text-center mt-9">
      <h3 className="text-[#46a358] text-[20px] font-normal leading-[120%]">
        {data?.title}
      </h3>
      <h2 className="text-[#3d3d3d] font-bold text-[20px]">
        UP TO {data?.discoount_up_to}% OFF
      </h2>
      <img src={data?.poster_image_url} alt="" />
    </div>
  );
};

export default Discount;
