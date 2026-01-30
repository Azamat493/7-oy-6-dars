import { type ReactNode } from "react";
import { Button, Result } from "antd";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get("token");

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Result
          status="403"
          title="Ruxsat berilmadi"
          subTitle="Bu sahifani ko'rish uchun avval tizimga kirishingiz kerak."
          extra={
            <div className="flex justify-center gap-3">
              <Button
                type="primary"
                className="bg-[#46A358] hover:!bg-[#357a40]"
                onClick={() => {
                  alert("Iltimos, Login tugmasini bosing");
                }}
              >
                Tizimga kirish
              </Button>
              <Button href="/">Bosh sahifaga qaytish</Button>
            </div>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
