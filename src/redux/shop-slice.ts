import { createSlice } from "@reduxjs/toolkit";
import type { ProductType, ShopCartType } from "../@types/AuthType";

interface InitialStateType {
  data: ShopCartType[];
}
const initialState: InitialStateType = {
  data: JSON.parse(localStorage.getItem("shop") as string) || [],
};
const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    getData(state, { payload }) {
      if (state.data.find((value) => value._id === payload._id)) {
        state.data = state.data.map((value) => {
          if (value._id === payload._id) {
            return {
              ...value,
              counter: value.counter + 1,
              userPrice: value.price * value.counter,
            };
          }
          return value;
        });
        localStorage.setItem("shop", JSON.stringify(state.data));
        return;
      }
      state.data = [
        ...state.data,
        { ...payload, counter: 1, userPrice: payload.price },
      ];
      localStorage.setItem("shop", JSON.stringify(state.data));
    },
    deleteData(state, { payload }) {
      state.data = state.data.filter((value) => value._id !== payload);
      localStorage.setItem("shop", JSON.stringify(state.data));
    },
    increment(state, { payload }) {
      state.data = state.data.map((value) => {
        if (value._id === payload) {
          return {
            ...value,
            counter: value.counter += 1,
            userPrice: value.price * value.counter,
          };
        }
        return value;
      });
      localStorage.setItem("shop", JSON.stringify(state.data));
    },
    decrement(state, { payload }) {
      state.data = state.data.map((value) => {
        if (value._id === payload) {
          return {
            ...value,
            counter: value.counter === 1 ? 1 : value.counter -= 1,
            userPrice: value.price * value.counter,
          };
        }
        return value;
      });
      localStorage.setItem("shop", JSON.stringify(state.data));
    },
  },
});

export const { getData, deleteData, increment, decrement } = shopSlice.actions;
export default shopSlice.reducer;
