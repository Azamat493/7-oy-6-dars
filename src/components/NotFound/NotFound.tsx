import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Result
        status="404"
        title={<span className="text-[#3D3D3D] font-bold text-2xl">404</span>}
        subTitle={<span className="text-[#727272]">Kechirasiz, siz tashrif buyurgan sahifa mavjud emas.</span>}
        extra={
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate("/")}
            className="bg-[#46A358] hover:!bg-[#357a40] border-none shadow-md shadow-[#46a3584d]"
          >
            Bosh sahifaga qaytish
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;