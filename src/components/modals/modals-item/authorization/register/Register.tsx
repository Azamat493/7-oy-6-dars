import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import GoogleIcon from "../../../../../assets/icon/google";
import { useRegisterMutation } from "../../../../../hooks/useQuery/useQueryAction/useQueryAction";
import { Loader } from "lucide-react";
import type { RegisterType } from "../../../../../@types/AuthType";
import { notificationApi } from "../../../../../generic/notificationApi/NotificationApi";

const Register = () => {
  const input_style = "h-[40px] mt-2 border-[#46A358]";
  const google_btn_style =
    "group border border-[#EAEAEA] h-[40px] rounded-md flex items-center justify-center gap-3 cursor-pointer " +
    "hover:border-[#46A358] hover:shadow-sm " +
    "active:scale-[0.98] transition-all duration-200 text-[#727272] w-full bg-white";

  const { mutate, isPending } = useRegisterMutation();

  const notify = notificationApi();
  const user_register = (e: RegisterType) => {
    if (e.password !== e.confirm_password) {
      return notify("confirm_password");
    }
    const { name, password, surname, email } = e;
    mutate({ name, password, surname, email });
  };
  return (
    <div className="w-full px-5 pb-6">
      <div className="mt-4">
        <p className="mb-4 text-[#3D3D3D] text-[13px]">
          Enter your personal details to register.
        </p>

        <Form
          onFinish={user_register}
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
            rules={[
              { required: true, message: "Iltimos, ismingizni kiriting!" },
            ]}
          >
            <Input placeholder="name" className={input_style} />
          </Form.Item>

          <Form.Item
            name="surname"
            className="mb-4"
            rules={[
              { required: true, message: "Iltimos, familiyangizni kiriting!" },
            ]}
          >
            <Input placeholder="surname" className={input_style} />
          </Form.Item>

          <Form.Item
            name="email"
            className="mb-4"
            rules={[
              {
                required: true,
                message: "Iltimos, elektron pochtangizni kiriting!",
              },
              { type: "email", message: "Elektron pochta formati noto'g'ri!" },
            ]}
          >
            <Input
              placeholder="enter your email adress"
              autoComplete="off"
              className={input_style}
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="mb-6"
            rules={[
              { required: true, message: "Iltimos, parolingizni kiriting!" },
              {
                min: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
              },
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
          <Form.Item
            name="confirm_password"
            rules={[
              { required: true, message: "Iltimos, parolingizni tasdiqlang!" },
            ]}
          >
            <Input.Password
              placeholder="confirm password"
              className={input_style}
              iconRender={(v) =>
                v ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
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
            {isPending ? <Loader className="animate-spin" /> : "Register"}
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
