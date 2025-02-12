import bcrypt from "bcrypt"
import UserAuth from "../../models/userAuths";
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from "./utils";
import { Response, Request, NextFunction } from "express";

// Sign In request
export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userAuth = await UserAuth.findOne({ email: email });

    if (!userAuth)
      return res.status(500).json({
        message: "userAuth doesnt exist",
        type: "error",
      });
    const isMatch = await bcrypt.compare(password, userAuth.password);
    if (!isMatch)
      return res.status(500).json({
        message: "Password is incorrect! ⚠️",
        type: "error",
      });
    const accessToken = createAccessToken(userAuth._id);
    const refreshToken = createRefreshToken(userAuth._id);
    userAuth.refreshtoken = refreshToken;
    await userAuth.save();
    
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error signing in!",
      error,
    });
  }
};
