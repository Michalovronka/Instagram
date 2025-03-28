import User from "../../models/users";
import pfpController from "./pfpController";
import { Response, Request, NextFunction } from "express";
import Profile from "../../models/profiles";
import fs from "fs";
import path from "path";
import { saveFileIntoFolder, deletePhoto } from "./pfpFileUploadUtils";
import UserAuth from "../../models/userAuths";

//GET, DELETE & UPDATE USER
//DELETE & UPDATE WILL WORK WITH AUTHENTICATION - NO PARAMS

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user;
    
    if (req.params.username) user = await User.findOne({ userName: req.params.username });
    else if (req.userId) user = await User.findById(req.userId);
    if (user) {
      return res.status(200).json({
        userName:user.userName,
        displayName:user.displayName,
        pfpSrc:user.pfpSrc
      });
    }
    res.status(404).json({ msg: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName } = req.params;
    const userData = await User.findOne({ userName: userName });

    const user = await User.findOneAndDelete({ userName: userName });
    if (!user || !userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    deletePhoto(
      path.join(
        __dirname,
        `../../../public/pfps/${userData.pfpSrc.substring(26)}`
      )
    );
    await Profile.deleteOne({ user: userData._id });
    await UserAuth.deleteOne({ referencesUser: userData._id });

    //add uploads, stories, reels, likes, comments, savedContent?? when finished always - deleteMany all of them

    res.status(200).json({
      msg: `User ${user.userName} deleted successfully`,
      payload: user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//IN POSTMAN SWITCH TO X-WWW-FORM-URLENCODED OR RAW
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, displayName, bio } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName: req.params.userNameParam },
      { userName, displayName },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: updatedUser._id },
      { bio },
      { new: true }
    );
    res.status(200).json({
      msg: "User updated successfully",
      payload: [updatedUser, updatedProfile],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updatePfp = [
  saveFileIntoFolder,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    try {
      const originalUser = await User.findOne({userName: req.params.userName});

      if(!originalUser){
        deletePhoto(path.join(
          __dirname,
          `../../../public/pfps/${req.file.filename}`
        ))
        return res.status(500).json({error: "User not found"})
      }
  
      const updateUser = await User.findOneAndUpdate(
        { userName: req.params.userName },
        { pfpSrc: `http://localhost:3000/pfps/${req.file.filename}`},
        { new: true }
      );

      deletePhoto(
        path.join(
          __dirname,
          `../../../public/pfps/${originalUser.pfpSrc.substring(26)}`
        )
      );

      res.status(200).json({
        msg: "User updated successfully",
        payload: req.file.filename,
      });
    }
    catch (error: any) {
      //console.error(error);
      return res
        .status(500)
        .json({ message: "Error Uploading image" });
    }
  },
];
