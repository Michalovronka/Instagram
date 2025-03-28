import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasicUserInfo {
  userName: string;
  displayName: string;
  pfpSrc: string;
}

const initialState: BasicUserInfo = {
  userName: "",
  displayName: "",
  pfpSrc: "",
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<BasicUserInfo>) => {
      if (state.userName.length === 0) {
        return { ...state, ...action.payload };
      }
    },
    setDefaultUserValue: (state) => {
      state.userName = "";
      state.displayName = "";
      state.pfpSrc = "";
    },
  },
});

export const { setLoggedInUser, setDefaultUserValue } =
  loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
