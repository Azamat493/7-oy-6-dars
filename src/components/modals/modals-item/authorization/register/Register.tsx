import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import GoogleIcon from "../../../../../assets/icon/google";
import { useRegisterMutation } from "../../../../../hooks/useQuery/useQueryAction/useQueryAction";
import { Loader } from "lucide-react";

const Register = () => {
  const input_style = "h-[40px] mt-2 border-[#46A358]";
  const google_btn_style =
    "group border border-[#EAEAEA] h-[40px] rounded-md flex items-center justify-center gap-3 cursor-pointer " +
    "hover:border-[#46A358] hover:shadow-sm " +
    "active:scale-[0.98] transition-all duration-200 text-[#727272] w-full bg-white";

  const { mutate, isPending } = useRegisterMutation();

  const onRegister = (values: any) => {
    mutate(values);
  };

  return (
    <div className="w-full px-5 pb-6">
      <div className="mt-4">
        <p className="mb-4 text-[#3D3D3D] text-[13px]">
          Enter your personal details to register.
        </p>

        <Form
          onFinish={onRegister}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
          }}
        >
          <Form.Item
            name="name"
            className="mb-4"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="name" className={input_style} />
          </Form.Item>

          <Form.Item
            name="surname"
            className="mb-4"
            rules={[{ required: true, message: "Please input your surname!" }]}
          >
            <Input placeholder="surname" className={input_style} />
          </Form.Item>

          <Form.Item
            name="email"
            className="mb-4"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              placeholder="example@gmail.com"
              autoComplete="off"
              className={input_style}
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="mb-6"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              placeholder="password"
              className={input_style}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              autoComplete="new-password"
            />
          </Form.Item>

          <button
            type="submit"
            disabled={isPending}
            className="bg-[#46A358] cursor-pointer w-full text-white h-[45px] rounded-md
              flex items-center justify-center font-bold text-base
              hover:bg-[#3d8f4d] hover:shadow-lg
              active:scale-[0.98]
              transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Register"
            )}
          </button>
        </Form>

        <div className="flex items-center justify-center mt-6 mb-6 gap-3">
          <div className="flex-1 h-[1px] bg-[#EAEAEA]"></div>
          <p className="text-[#3D3D3D] text-[13px]">Or register with</p>
          <div className="flex-1 h-[1px] bg-[#EAEAEA]"></div>
        </div>

        <div className={google_btn_style}>
          <GoogleIcon />
          <p className="text-[#727272] group-hover:text-[#46A358]">
            Register with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
