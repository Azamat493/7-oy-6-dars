import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-store";

export const store = configureStore({
  reducer: {
    modalSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
