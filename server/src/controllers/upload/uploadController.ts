import User from "../../models/users";
import UserAuth from "../../models/userAuths";
import { Response, Request, NextFunction } from "express";
import uploadFileController from "./uploadFileController";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import Profile from "../../models/profiles";
import Upload from "../../models/content/uploads";

//GET, DELETE & UPDATE POST UPLOAD
// need some authentiacaion middleware that check if you can delete i think

const uploadFile = uploadFileController.single("uploadFile");

const saveFileIntoFolder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadFile(req, res, (err: any) => {
    if (err) {
      //console.log(err);
      return res.status(500).json({ message: "Invalid file format" });
    }
    next();
  });
};

const deletePhoto = async (filePath: string) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    //console.error(err);
    throw new Error("Failed to delete upload photo");
  }
};

const createUpload = [
  saveFileIntoFolder,
  async (req: Request, res: Response, next: NextFunction) => {
    const { description } = req.body;
    if (!req.file) {
      return res.status(500).json({ message: "File didn't upload" });
    }

    //authentication will change this so i dont have to find user  pls
    const existingUser = await User.findOne({ userName: req.params.userName });
    if (!existingUser) {
      return res.status(404).send("neni");
    }
    try {
      const newUpload = new Upload({
        uploadedBy: existingUser._id,
        description,
        contentSrc: "http://localhost:3000/upload/" + req.file.filename,
      });
      await newUpload.save();
    } catch (error: any) {
      //console.error(error);
      await deletePhoto(
        path.join(__dirname, `../../../public/uploads/${req.file.filename}`)
      );
      return res
        .status(500)
        .json({ message: "Error creating uplaod", error: error.message });
    }
  },
];

//probably works 100%
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const upload = await Upload.findOne({ _id: id });
    if (upload) {
      return res.status(200).json({
        payload: upload,
        msg: "Upload found!",
      });
    }
    res.status(404).json({ msg: "Upload not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};


//probably works 100%
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const uploadData = await Upload.findOne({ _id: id });
    const upload = await Upload.findOneAndDelete({ _id: id });
    if (!upload || !uploadData) {
      return res.status(404).json({ msg: "Upload not found" });
    }
    deletePhoto(
      path.join(
        __dirname,
        `../../../public/uploads/${uploadData.contentSrc.substring(26)}`
      )
    );
    res.status(200).json({
      msg: `Upload deleted successfully`,
      payload: upload,
    });
  } catch (error) {
    console.error("Error deleting upload:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//IN POSTMAN SWITCH TO X-WWW-FORM-URLENCODED OR RAW
//idk if i need it check if you can even update it on ig
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedUpload = await Upload.findOneAndUpdate(
      { _id: id},
      { description },
      { new: true }
    );
    if (!updatedUpload) {
      return res.status(404).json({ msg: "Upload not found" });
    }
    res.status(200).json({
      msg: "Upload updated successfully",
      payload: updatedUpload,
    });
  } catch (error) {
    console.error("Error updating upload:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default createUpload;
