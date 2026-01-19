import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../useAxios/UseAxios";

export const useLoginMutation = () => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: object) =>
      axios({ url: "user/sign-in", method: "POST", body: data }),
    onSuccess(data) {
      console.log(data);
    },
  });
};

export const useRegisterMutation = () => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: object) =>
      axios({ url: "user/sign-up", method: "POST", body: data }), 
    onSuccess(data) {
      console.log("Registratsiya muvaffaqiyatli:", data);
    },
    onError(error) {
      console.log("Xatolik yuz berdi:", error);
    }
  });
};