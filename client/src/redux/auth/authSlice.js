import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = true;
    },
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isLoading = false;
    },
  },
});

export const { loginSuccess, logout, reset } = authSlice.actions;
export default authSlice.reducer;
