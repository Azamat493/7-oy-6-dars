import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  authorizationModalVisibility: boolean;
  // Modal komponentingiz kutayotgan statelar:
  openDeleteOrderModal: boolean;
  orderData: any | null;
}

const initialState: InitialStateType = {
  authorizationModalVisibility: false,
  openDeleteOrderModal: false,
  orderData: null,
};

export const modalSlice = createSlice({
  name: "modal-slice",
  initialState,
  reducers: {
    setAuthorizationModalVisibility(state) {
      state.authorizationModalVisibility = !state.authorizationModalVisibility;
    },

    // TrackOrder va Modal ishlatayotgan action:
    setOpenDeleteOrderModal(
      state,
      action: PayloadAction<{ open: boolean; data: any }>,
    ) {
      state.openDeleteOrderModal = action.payload.open;
      state.orderData = action.payload.data;
    },
  },
});

export const { setAuthorizationModalVisibility, setOpenDeleteOrderModal } =
  modalSlice.actions;
export default modalSlice.reducer;
