import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = action.payload;
    },
    postReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    postError: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const { postSuccess, postReset } = postSlice.actions;
export default postSlice.reducer;
