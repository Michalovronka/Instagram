import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasicUserInfo {
  _id: string;
  userName: string;
  displayName: string;
  pfpSrc: string;
}

const initialState: BasicUserInfo = {
  _id: "",
  userName: "",
  displayName: "",
  pfpSrc: "",
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<BasicUserInfo>) => {
      return { ...state, ...action.payload };
    },
    setDefaultUserValue: (state) => {
      state._id = "";
      state.userName = "";
      state.displayName = "";
      state.pfpSrc = "";
    },
  },
});

export const { setLoggedInUser, setDefaultUserValue } =
  loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
