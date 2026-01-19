import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  authorizationModalVisibility: boolean;
}
const initialState: InitialStateType = {
  authorizationModalVisibility: false,
};
export const modalSlice = createSlice({
  name: "modal-slice",
  initialState,
  reducers: {
    setAuthorizationModalVisibility(state) {
      state.authorizationModalVisibility = !state.authorizationModalVisibility;
    },
  },
});

export const { setAuthorizationModalVisibility } = modalSlice.actions;
export default modalSlice.reducer;
