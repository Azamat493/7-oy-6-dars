import { Skeleton } from "antd";

const loaderApi = () => {
  const cateGoryLoader = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <Skeleton.Input key={index} block />
    ));
  };
  return { cateGoryLoader };
};

export { loaderApi };
