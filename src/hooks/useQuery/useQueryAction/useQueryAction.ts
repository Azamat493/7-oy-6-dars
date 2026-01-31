import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../useAxios/UseAxios";
import { notificationApi } from "../../../generic/notificationApi/NotificationApi";
import Cookies from "js-cookie";
import { useReduxDispatch } from "../../useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../../../redux/modal-store";
import { getUser } from "../../../redux/user-slice";
import { signInWithGoogle } from "../../../config/config";
import { getCoupon, clearCart } from "../../../redux/shop-slice";


export const useLoginMutation = () => {
  const notify = notificationApi();
  const axios = useAxios();
  const dispatch = useReduxDispatch();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: object) =>
      axios({ url: "user/sign-in", method: "POST", body: data }),
    onSuccess(data) {
      notify("login");
      const { token, user } = data;
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      dispatch(getUser(user));
      dispatch(setAuthorizationModalVisibility());
    },
    onError(error: { status: number }) {
      if (error.status === 409) {
        notify("409");
      }
    },
  });
};

export const useRegisterMutation = () => {
  const notify = notificationApi();
  const axios = useAxios();
  const dispatch = useReduxDispatch();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: object) =>
      axios({ url: "user/sign-up", method: "POST", body: data }),
    onSuccess(data) {
      notify("register");
      const { token, user } = data;
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      dispatch(getUser(user));
      dispatch(setAuthorizationModalVisibility());
    },
    onError(error: { status: number }) {
      if (error.status === 409) {
        notify("409");
      }
    },
  });
};

export const useOnAuthGoogle = () => {
  const notify = notificationApi();
  const axios = useAxios();
  const dispatch = useReduxDispatch();

  return useMutation({
    mutationKey: ["sign-google"],
    mutationFn: async () => {
      const response = await signInWithGoogle();
      return axios({
        url: "user/sign-in/google",
        method: "POST",
        body: { email: response.user.email },
      });
    },
    onSuccess(data) {
      notify("login");
      const { token, user } = data;
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      dispatch(getUser(user));
      dispatch(setAuthorizationModalVisibility());
    },
    onError(error: { status: number }) {
      if (error.status === 409) {
        return notify("409");
      }
      notify("error");
    },
  });
};

export const useGetCoupon = () => {
  const axios = useAxios();
  const dispatch = useReduxDispatch();
  const notify = notificationApi();

  return useMutation({
    mutationKey: ["coupon"],
    mutationFn: ({ coupon_code }: { coupon_code: string }) =>
      axios({
        url: "features/coupon",
        method: "GET",
        param: { coupon_code: coupon_code },
      }),

    onSuccess(data) {
      console.log("Kupon ma'lumoti:", data);
      dispatch(getCoupon(data?.data?.discount_for || data?.discount_for));
      notify("coupon");
    },
    onError(error: { status: number }) {
      if (error.status === 400) {
        notify("not_coupon");
      }
    },
  });
};

export const useMakeOrderMutation = () => {
  const axios = useAxios();

  const dispatch = useReduxDispatch();

  return useMutation({
    mutationKey: ["make-order"],
    mutationFn: (body: object) =>
      axios({
        url: "order/make-order",
        method: "POST",
        body,
      }),
    onSuccess: () => {
      dispatch(clearCart());
      localStorage.removeItem("shop");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetOrdersQuery = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["get-orders"],
    queryFn: () =>
      axios({
        url: "order/get-order",
        method: "GET",
      }),
    refetchOnWindowFocus: false,
  });
};

export const useDeleteOrderMutation = () => {
  const axios = useAxios();
  const notify = notificationApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-order"],
    mutationFn: (id: string) =>
      axios({
        url: "order/delete-order",
        method: "DELETE",
        body: { _id: id },
      }),
    onSuccess: () => {
      notify("order-delete");
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    },
    onError: () => notify("error"),
  });
};

export const useIncreaseView = () => {
  const axios = useAxios();

  return useMutation({
    mutationKey: ["increment-view"],
    mutationFn: ({ postId }: { postId: string }) =>
      axios({
        url: "user/blog/view",
        method: "PUT",
        body: { _id: postId },
      }),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUpdateUser = () => {
  const axios = useAxios();

  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) =>
      axios({
        url: "user/account-details",
        method: "POST",
        body: data,
      }),
  });
};
export const useUpdateAdress = () => {
  const axios = useAxios();

  return useMutation({
    mutationKey: ["update-user-adress"],
    mutationFn: (data: any) =>
      axios({
        url: "user/address",
        method: "POST",
        body: data,
      }),
  });
};

export const useCreateBlogMutation = () => {
  const axios = useAxios();
  const notify = notificationApi();

  return useMutation({
    mutationKey: ["create-blog"],
    mutationFn: (data: { title: string; content: string; short_description: string }) =>
      axios({
        url: "user/blog",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      notify("post"); 
    },
    onError: () => notify("error"),
  });
};