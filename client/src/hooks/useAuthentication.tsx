import { useEffect, useState } from "react";
import { setLogInAuth } from "../slices/AuthSlice";
import {
  setDefaultUserValue,
  setLoggedInUser,
} from "../slices/LoggedInUserSlice";
import api from "../api";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

export interface BasicUserInfo {
  _id:string;
  userName: string;
  displayName: string;
  pfpSrc: string;
}

const useAuthentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser?.userName) {
      setIsLoading(false);
      return;
    }
    authenticateUser(); 
  }, [dispatch, loggedInUser]);

  const authenticateUser = async () => {
    try {
      setIsLoading(true);
      await api.post("/auth/getToken");
      const userResponse: BasicUserInfo = await api.get("/auth/getLoggedInUserInfo");
      dispatch(setLoggedInUser(userResponse));
      dispatch(setLogInAuth());
      setIsLoading(false);
    } catch (err: unknown) {
      dispatch(setDefaultUserValue());
      setIsLoading(false);
      console.error((err as { message?: string }).message || "Error");
    }
  };

  return { isLoading, authenticateUser };
};

export default useAuthentication;