import User from "../../models/users";
import { Response, Request, NextFunction } from "express";
import Comment from "../../models/interactions/comments";
import Upload from "../../models/content/uploads";
import Saved from "../../models/interactions/saved";

//GET, DELETE & UPDATE POST COMMENT

export const createSaved = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contentId, username } = req.params;

  const upload = await Upload.findOne({ _id: contentId });

  if (!upload) {
    return res.status(404).json({ message: "Content not found" });
  }

  const user = await User.findOne({ userName: username });
  if (!user) return res.status(500).send("User not found");
  const isSaved = await Saved.findOne({
    savedBy: user._id,
    savedOnId: contentId,
  });
  if(isSaved) return res.status(200).send("Already Saved");

  try {
    const newSaved = new Saved({
      savedBy: user._id,
      savedOnId: contentId,
    });
    await newSaved.save();
    return res.status(200).send("Content was Saved");
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating Comment", error: error.message });
  }
};

export const deleteSaved = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contentId, username } = req.params;

  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(500).send("User not found");

    const deletedSaved = await Saved.findOneAndDelete({
      savedBy: user._id,
      savedOnId: contentId,
    });

    if (!deletedSaved) return res.status(505).json({ msg: "Saved not deleted" });

    return res.status(200).send("Saved was Deleted");
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error deleting Saved", error: error.message });
  }
};

export const isContentSaved = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contentId, username } = req.params;

  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(500).send("User not found");

    const isSaved = await Saved.findOne({
      savedBy: user._id,
      savedOnId: contentId,
    });
    if(isSaved) return res.status(200).send(true);
    return res.status(200).send(false);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating Comment", error: error.message });
  }
};

export const getAllSaved = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ userName: username });
      if (!user) return res.status(500).send("User not found");
  
      const allSaved = await Saved.find({
        savedBy: user._id,
      });
      const savedUploadsId = allSaved.map((saved) => saved.savedOnId);
      return res.status(200).send(savedUploadsId);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error creating Comment", error: error.message });
    }
  };
