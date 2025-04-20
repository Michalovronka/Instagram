
import pfpController from "./pfpController";
import { Response, Request, NextFunction } from "express";
import fs from "fs";
import path from "path";

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
    console.log("Error with Deleting Image / Video")
    console.error(err); 
  }
}
