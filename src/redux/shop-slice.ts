import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductType, ShopCartType } from "../@types/AuthType";

interface InitialStateType {
  data: ShopCartType[];
  coupon: number;
}

const initialState: InitialStateType = {
  data: JSON.parse(localStorage.getItem("shop") as string) || [],
  coupon: 0, 
};

const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    getData(state, action: PayloadAction<ProductType>) {
      const existingItem = state.data.find(
        (item) => item._id === action.payload._id,
      );

      if (existingItem) {
        existingItem.counter += 1;
        existingItem.userPrice = existingItem.price * existingItem.counter;
      } else {
        state.data.push({
          ...action.payload,
          counter: 1,
          userPrice: action.payload.price,
        });
      }

      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    deleteData(state, action: PayloadAction<string>) {
      state.data = state.data.filter((item) => item._id !== action.payload);
      localStorage.setItem("shop", JSON.stringify(state.data));
    },

    increment(state, action: PayloadAction<string>) {
      const item = state.data.find((item) => item._id === action.payload);
      if (item) {
        item.counter += 1;
        item.userPrice = item.price * item.counter;
        localStorage.setItem("shop", JSON.stringify(state.data));
      }
    },

    decrement(state, action: PayloadAction<string>) {
      const item = state.data.find((item) => item._id === action.payload);
      if (item) {
        if (item.counter > 1) {
          item.counter -= 1;
          item.userPrice = item.price * item.counter;
          localStorage.setItem("shop", JSON.stringify(state.data));
        }
      }
    },
      getCoupon(state, action: PayloadAction<number>) {
      state.coupon = action.payload;
    }
  },
});

export const { getData, deleteData, increment, decrement, getCoupon } = shopSlice.actions;
export default shopSlice.reducer;