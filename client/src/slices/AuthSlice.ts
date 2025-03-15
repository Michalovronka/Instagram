import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  value: boolean;
}

const initialState: AuthState = { value: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogInAuth: (state) => {
      state.value = true;
    },
    setLogOutAuth: (state) => {
      state.value = false;
    },
  },
});

export const { setLogInAuth } = authSlice.actions;
export default authSlice.reducer;
