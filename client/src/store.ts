import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice"
import loggedInUserReducer from "./slices/LoggedInUserSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loggedInUser: loggedInUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;