import { Select } from "antd";
import { products_title } from "../../../utils/utils";
import { useSearchParamsHandler } from "../../../hooks/paramsApi/paramsApi";

const ProductsTitleSection = () => {
  const { setParam, getParam } = useSearchParamsHandler();
  const category = getParam("category") || "house-plants";
  const range_max = Number(getParam("range_max")) || 1000;
  const range_min = Number(getParam("range_min")) || 0;
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort") || "default-sorting";

  const changed = (e: string) => {
    setParam({ sort: e });
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
      <div className="flex items-center gap-6 md:gap-8 cursor-pointer">
        {products_title.map((value) => (
          <h3
            key={value.id}
            onClick={() =>
              setParam({
                category,
                range_max,
                range_min,
                type: value.route_path,
              })
            }
            className={`text-[15px] transition-all duration-300 relative pb-1
              ${
                value.route_path === type
                  ? "text-[#46a358] font-bold border-b-2 border-[#46a358]"
                  : "text-[#3d3d3d] hover:text-[#46a358] border-b-2 border-transparent"
              }`}
          >
            {value.title}
          </h3>
        ))}
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <span className="text-[#3d3d3d] text-[15px]">Short by:</span>
        <Select
          onChange={changed}
          defaultValue={sort}
          style={{ width: 150 }}
          className="min-w-[140px]"
          options={[
            { value: "default-sorting", label: "Default Sorting" },
            { value: "the-cheapest", label: "The Cheapest" },
            { value: "most-expensive", label: "Most Expensive" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsTitleSection;
