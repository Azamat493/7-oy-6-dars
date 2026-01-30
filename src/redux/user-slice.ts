import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types/AuthType";

interface InitialStateType {
  user?: AuthType | null; // null bo'lishi ham mumkin
  isAuth: boolean;
}

const userCookie = Cookies.get("user");

const initialState: InitialStateType = {
  user: userCookie ? JSON.parse(userCookie) : null,
  isAuth: !!userCookie, // userCookie bor bo'lsa true, yo'q bo'lsa false
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    // --- YANGI QO'SHILGAN QISM: LOGOUT ---
    logout(state) {
      state.user = null;  // User ma'lumotini o'chiramiz
      state.isAuth = false; // Statusni false qilamiz
    },
  },
});

// logout ni ham export qilishni unutmang!
export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;