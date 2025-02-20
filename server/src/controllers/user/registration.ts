import User from "../../models/users";
import UserAuth from "../../models/userAuths";
import pfpController from "./pfpController";
import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt"; 

import path from "path";
import Profile from "../../models/profiles";
import { saveFileIntoFolder, deletePhoto } from "./pfpFileUploadUtils";

//POST USER, USERAUTH, PROFILE 

export const registerUser = [saveFileIntoFolder, async (req: Request, res: Response, next: NextFunction) => {
  const { userName, displayName, email, password } = req.body;
  let currentUser;

  if (!req.file) {
    req.file = { filename: "Default_pfp.png" } as Express.Multer.File;
  }
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    await deletePhoto(path.join(__dirname, `../../../public/pfps/${req.file.filename}`));
    return res.status(400).send("Username exists");
  }
  const existingEmail = await UserAuth.findOne({ email });
  if (existingEmail) {
    await deletePhoto(path.join(__dirname, `../../../public/pfps/${req.file.filename}`));
    return res.status(400).send("Email exists");
  }

  try{
    const newUser = new User({
      userName, 
      displayName,
      pfpSrc: "http://localhost:3000/pfp/" + req.file.filename
    });
    await newUser.save();
    currentUser = newUser;
  }
  catch(error: any){
    //console.error(error);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserAuth = new UserAuth({
      referencesUser:currentUser._id,
      email,
      password: hashedPassword,
    });
    await newUserAuth.save();
  } catch (error: any) {
    //console.error(error);
    await deletePhoto(path.join(__dirname, `../../../public/pfps/${req.file.filename}`));
    await User.findByIdAndDelete(currentUser._id);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }

  try{
    const newProfile = new Profile({
      user: currentUser._id
    });
    await newProfile.save();
    res.status(201).json({ message: 'User and Profile created successfully', user: currentUser});
  }
  catch(error: any){
    //console.error(error);
    return res.status(500).json({ message: 'Error creating profile', error: error.message });
  }

  next();
}];
