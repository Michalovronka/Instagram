import bcrypt from "bcrypt"
import UserAuth from "../../models/userAuths";
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from "./authenticationUtils";
import { Response, Request, NextFunction } from "express";

export const LogIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userAuth = await UserAuth.findOne({ email: email });
    if (!userAuth)
      return res.status(500).json({
        message: "User doesn't exist",
      });
    const isValidPassword = await bcrypt.compare(password, userAuth.password);
    if (!isValidPassword)
      return res.status(500).json({
        message: "Password is incorrect",
        type: "error",
      });
    const accessToken = createAccessToken(userAuth._id);
    const refreshToken = createRefreshToken(userAuth._id);
    userAuth.refreshtoken = refreshToken;
    await userAuth.save();
    
    console.log(`User with email ${email} logged in`);
    sendRefreshToken(res, refreshToken);
    return sendAccessToken(res, accessToken);
  } catch (error) {
    res.status(500).json({
      message: "Error with logging in",
      error,
    });
  }
};

export const LogOut = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",        
  });
  return res.status(200).send("Logout succesfull");
}
