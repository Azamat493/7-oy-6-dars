import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types/AuthType";

interface InitialStateType {
  user?: AuthType | null;
  isAuth: boolean;
}

const userCookie = Cookies.get("user");

const initialState: InitialStateType = {
  user: userCookie ? JSON.parse(userCookie) : null,
  isAuth: !!userCookie,
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },

    logout(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
