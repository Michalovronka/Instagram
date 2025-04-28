import User from "../../models/users";
import { Response, Request, NextFunction } from "express";
import uploadFileController from "./uploadFileController";
import path from "path";
import fs from "fs";
import Upload from "../../models/content/uploads";
import mongoose from "mongoose";
import Profile from "../../models/profiles";

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

export const createUpload = [
  saveFileIntoFolder,
  async (req: Request, res: Response, next: NextFunction) => {
    const { uploadedByUserName, description } = req.body;
    if (!req.file) {
      return res.status(500).json({ message: "File didn't upload" });
    }
    const user = await User.findOne({ userName: uploadedByUserName });
    if (!user) {
      return res.status(404).send("User not found");
    }
    try {
      const upload = new Upload({
        uploadedBy: user._id,
        description,
        contentSrc: "http://localhost:3000/uploads/" + req.file.filename,
      });
      await upload.save();
      return res.status(200).send("Upload crearted");
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

export const getUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const upload = await Upload.findOne({ _id: id });
    if (upload) {
      return res.status(200).json({
        uploadedBy: upload.uploadedBy,
        contentSrc: upload.contentSrc,
        description: upload.description,
        dateOfCreation: upload.dateOfCreation,
        numberOfComments: upload.numberOfComments,
        numberOfLikes: upload.numberOfLikes,
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

export const getAllUploadsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(404).send("User not found");

    const uploads = await Upload.find({ uploadedBy: user._id });
    if (!uploads) return res.status(404).send("Uploads not found");
    const uploadsId = uploads.map((upload) => upload._id);
    return res.status(200).json(uploadsId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const getRandomUploads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const randomUploads = await Upload.aggregate([{ $sample: { size: 6 } }]);
    const uploadsId = randomUploads.map((upload) => upload._id);
    return res.status(200).json(uploadsId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

//probably works 100%
export const deleteUpload = async (
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
export const updateUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedUpload = await Upload.findOneAndUpdate(
      { _id: id },
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

export const getAllUploadsByFollowedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(404).send("User not found");

    const profile = await Profile.findOne({ user: user._id });
    if (!profile) return res.status(404).send("User not found");

    const allFollowedUsersUploads = [];

    for (const followedUser of profile.following) {
      const uploads = await Upload.find({ uploadedBy: followedUser });
      if (!uploads) return res.status(404).send("Uploads not found");
      const uploadsId = uploads.map((upload) => upload._id);
      allFollowedUsersUploads.push(...uploadsId);
    }
    allFollowedUsersUploads.sort((a, b) => {
      const timestampA = new mongoose.Types.ObjectId(a)
        .getTimestamp()
        .getTime();
      const timestampB = new mongoose.Types.ObjectId(b)
        .getTimestamp()
        .getTime();
      return timestampA - timestampB;
    });

    return res.status(200).send(allFollowedUsersUploads);
  } catch (error) {
    console.error("Error updating upload:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
