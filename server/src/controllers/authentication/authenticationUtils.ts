import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Request, NextFunction, Response } from "express";
import UserAuth from "../../models/userAuths";
import User from "../../models/users";
dotenv.config();

//works somehow 

export const createAccessToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: 15 * 60,
  });
};

export const createRefreshToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "90d",
  });
};

export const sendAccessToken = (res: Response, accesstoken: string) => {
  res.json({
    accesstoken,
    message: "Log in Successful",
  });
};

export const sendRefreshToken = (res: Response, refreshtoken: string) => {
  res.cookie("refreshToken", refreshtoken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const GetUserIdByAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.ACCESS_TOKEN_SECRET)
    return res.status(500).json({ message: "Server Token Error" });

  const refreshToken = req.cookies.refreshToken;
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ message: "Token Error" });

  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token Error" });

  let payload: JwtPayload & { id: string };
  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload & {
      id: string;
    };
    console.log(payload.id);
  } catch {
    return res.status(401).json({ message: "Token Error" });
  }
  
  const userAuth = await UserAuth.findById(payload.id);
  if (!userAuth)
    return res.status(401).json({ message: "UserAuth doesn't exist" });

  const user = await User.findById(userAuth.referencesUser);
  if (!user) return res.status(401).json({ message: "User doesn't exist" });

  req.userId = user._id.toString();
  console.log(`${user.userName} authenticited`);
  next();
};


const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};

export const Verify = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const userAuth = await UserAuth.findById(decoded.id);
    if (!userAuth) return res.status(404).json({ message: "UserAuth doesn't exist" });
    
    const newAccessToken = createAccessToken(new mongoose.Types.ObjectId(decoded.id));
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};