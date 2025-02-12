import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Response } from "express";
dotenv.config();

export const createAccessToken = (id:mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: 15 * 60,
  });
};

export const createRefreshToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "90d",
  });
};

export const sendAccessToken = (res:Response, accesstoken:string) => {
  res.json({
    accesstoken,
    message: "Log in Successful",
  });
};

export const sendRefreshToken = (res:Response, refreshtoken:string) => {
  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
  });
};