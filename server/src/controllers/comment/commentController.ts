import User from "../../models/users";
import { Response, Request, NextFunction } from "express";
import path from "path";
import fs from "fs";
import Comment from "../../models/interactions/comments";

//GET, DELETE & UPDATE POST COMMENT

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentOnId, text, commentedBy } = req.body;

  const user = await User.findOne({ userName: commentedBy });
  if (!user) return res.status(404).send("User not found");

  try {
    const uploadComment = new Comment({
      commentedBy: user._id,
      commentOnId,
      text,
    });
    await uploadComment.save();
    return res.status(200).send(uploadComment._id);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating Comment", error: error.message });
  }
};

export const getAllCommentsFromUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ commentOnId: id });
    if (!comments) return res.status(200).send("Comments not found");
    const commentsIDs = comments.map((upload) => upload._id);
    return res.status(200).send(commentsIDs);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error getting Comment", error: error.message });
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    const user = await User.findById(comment.commentedBy);
    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({
      username: user.userName,
      userPfp: user.pfpSrc,
      text: comment.text,
      dateOfCreation: comment.dateOfCreation,
      numberOfLikes: 0,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
/*


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
*/
