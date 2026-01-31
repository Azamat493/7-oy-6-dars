import { toast } from "react-hot-toast";


type NotificationType =
  | "login"
  | "409"
  | "confirm_password"
  | "register"
  | "error"
  | "coupon"
  | "not_coupon"
  | "order"         
  | "order-delete"; 

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
        return toast.error("Xatolik yuz berdi!");
      case "coupon":
        return toast.success("Chegirma qabul qilindi!");
      case "not_coupon":
        return toast.error("Chegirma aniqlanmadi!");
      
    
      case "order":
        return toast.success("Buyurtma muvaffaqiyatli qabul qilindi!");
      case "order-delete":
        return toast.success("Buyurtma muvaffaqiyatli o'chirildi!");
    }
  };
  return notify;
};