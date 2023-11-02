import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },

    setIsLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { setUser, setIsLogin } = authSlice.actions;

export default authSlice.reducer;
