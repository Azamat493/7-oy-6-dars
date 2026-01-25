import { useSearchParams } from "react-router-dom";

const useSearchParamsHandler = () => {
  const [params, setParams] = useSearchParams();
  const getParam = (path: string) => params.get(path);
  const setParam = (param: object) => {
    setParams({
      ...param,
    });
  };
  return { getParam, setParam };
};
export { useSearchParamsHandler };
