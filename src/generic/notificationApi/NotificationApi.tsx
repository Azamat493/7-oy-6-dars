import { toast } from "react-hot-toast";

type NotificationType =
  | "login"
  | "409"
  | "confirm_password"
  | "register"
  | "error";
export const notificationApi = () => {
  const notify = (type: NotificationType) => {
    switch (type) {
      case "login":
        return toast.success("Hush kelibsiz!");
      case "409":
        return toast.error("Email yoki parol xato!");
      case "confirm_password":
        return toast.error("Parollar mos emas!");
      case "register":
        return toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      case "error":
        return toast.error("Something error!");
    }
  };
  return notify;
};
