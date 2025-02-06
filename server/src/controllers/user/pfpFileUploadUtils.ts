import User from "../../models/users";
import UserAuth from "../../models/userAuths";
import pfpController from "./pfpController";
import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt"; 
import fs from "fs";
import path from "path";
import Profile from "../../models/profiles";

const userPfp = pfpController.single("pfpFile");

export const saveFileIntoFolder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userPfp(req, res, (err: any) => {
    if (err) {
      //console.log(err);
      return res.status(500).json({message:"Invalid file format"});
    }
    next();
  });
};

export const deletePhoto = async (filePath: string) =>{
  if(filePath === path.join(__dirname, `../../../public/pfps/Default_pfp.png`)) return;
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    //console.error(err);
    throw new Error("Failed to delete profile photo");
  }
}
