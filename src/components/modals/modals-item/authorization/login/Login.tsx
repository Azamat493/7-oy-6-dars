import { Form, Input } from "antd";
import GoogleIcon from "../../../../../assets/icon/google";
import FacebookIcon from "../../../../../assets/icon/facebook";
import {
  useLoginMutation,
  useOnAuthGoogle,
} from "../../../../../hooks/useQuery/useQueryAction/useQueryAction";
import { Loader } from "lucide-react";

const Login = () => {
  const input_style: string = "h-[40px] mt-2 border-[#46A358]";
  const icon_style: string =
    "border border-[#EAEAEA] h-[40px] rounded-md mb-4 flex items-center justify-center gap-3 cursor-pointer " +
    "hover:border-[#46A358] hover:text-[#46A358] hover:shadow-sm " +
    "active:scale-[0.98] transition-all duration-200 text-[#727272] w-full bg-white";

  const { mutate, isPending } = useLoginMutation();

  const login = (values: { email: string; password: string }) => {
    mutate(values);
  };
  const { mutate: mutateGoogle } = useOnAuthGoogle();
  return (
    <div className="w-4/5 m-auto">
      <div className="mt-5 mb-2">
        <p className="mb-2">Enter your email and password to login.</p>

        <Form onFinish={login} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Iltimos, elektron pochtangizni kiriting!",
              },
              {
                type: "email",
                message: "Kiritish haqiqiy E-mail emas!",
              },
            ]}
          >
            <Input
              placeholder="almamun_uxui@outlook.com"
              className={`${input_style}`}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Iltimos, parolingizni kiriting!",
              },
            ]}
          >
            <Input.Password
              placeholder="**********"
              autoComplete="new-password"
              className={input_style}
            />
          </Form.Item>

          <p className="text-end mt-2 text-[#46A358] text-sm cursor-pointer">
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="bg-[#46A358] cursor-pointer font-bold text-base w-full mt-4 text-white h-10 rounded-md
              flex items-center justify-center
              hover:bg-[#3d8f4d] hover:shadow-md
              active:scale-[0.98]
              transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader className="animate-spin" /> : "Login"}
          </button>
        </Form>

        <div className="flex items-center justify-center mt-5 gap-4">
          <div className="w-[30%] h-0.5 bg-[#EAEAEA]"></div>
          <p className="w-[40%] text-[#3D3D3D] text-center mb-4 text-[13px]">
            Or login with
          </p>
          <div className="w-[30%] h-0.5 bg-[#EAEAEA]"></div>
        </div>

        <div onClick={() => mutateGoogle()} className={`${icon_style}`}>
          <GoogleIcon />
          <p>Login with Google</p>
        </div>
        <div className={`${icon_style}`}>
          <FacebookIcon />
          <p>Login with Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
