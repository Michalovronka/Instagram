import User from "../../models/users";
import UserAuth from "../../models/userAuths";
import pfpController from "./pfpController";
import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt"; 

const userPfp = pfpController.single("pfpFile");

const saveFileIntoFolder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userPfp(req, res, (err: any) => {
    if (err) {
      console.log(err);
      console.log("error while uploading file");
      return res.status(500).send(err);
    }
    console.log("File uploaded");
    next();
  });
};

const registerUser = [saveFileIntoFolder, async (req: Request, res: Response, next: NextFunction) => {
  const { userName, displayName, email, password } = req.body;
  try {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const newUser = new User({
        userName, 
        displayName,
        pfpSrc: "http://localhost:3000/pfp/" + req.file.filename
    });
    await newUser.save();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserAuth = new UserAuth({
      email,
      password: hashedPassword,
      user: newUser._id, 
    });
    await newUserAuth.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}];

export default registerUser;
