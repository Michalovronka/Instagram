import User from "../../models/users";
import { Response, Request, NextFunction } from "express";
import Comment from "../../models/interactions/comments";
import Like from "../../models/interactions/likes";
import Upload from "../../models/content/uploads";

//GET, DELETE & UPDATE POST COMMENT

export const createLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contentId, username } = req.params;

  const upload = await Upload.findOne({ _id: contentId });
  const comment = await Comment.findOne({ _id: contentId });

  if (!upload && !comment) {
    return res.status(404).json({ message: "Content not found" });
  }

  const user = await User.findOne({ userName: username });
  if (!user) return res.status(500).send("User not found");
  const isLiked = await Like.findOne({
    likedBy: user._id,
    likeOnId: contentId,
  });

  try {
    const newLike = new Like({
      likedBy: user._id,
      likeOnId: contentId,
    });
    await newLike.save();
    if (upload) {
      await Upload.findByIdAndUpdate(contentId, {
        $inc: { numberOfLikes: 1 },
      });
    } else if (comment) {
      await Comment.findByIdAndUpdate(contentId, {
        $inc: { numberOfLikes: 1 },
      });
    } else {
      return res.status(404).json({ message: "Content not found" });
    }
    return res.status(200).send("Like was Added");
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating Comment", error: error.message });
  }
};

export const deleteLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contentId, username } = req.params;

  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(500).send("User not found");

    const deletedLike = await Like.findOneAndDelete({
      likedBy: user._id,
      likeOnId: contentId,
    });

    if (!deletedLike) return res.status(505).json({ msg: "Like not deleted" });

    const upload = await Upload.findOne({ _id: contentId });
    const comment = await Comment.findOne({ _id: contentId });

    if (upload) {
      await Upload.findByIdAndUpdate(contentId, {
        $inc: { numberOfLikes: -1 },
      });
    } else if (comment) {
      await Comment.findByIdAndUpdate(contentId, {
        $inc: { numberOfLikes: -1 },
      });
    } else {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).send("Like was Added");
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating Comment", error: error.message });
  }
};

export const isContentLiked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contentId, username } = req.params;

  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(500).send("User not found");

    const isLiked = await Like.findOne({
      likedBy: user._id,
      likeOnId: contentId,
    });
    if(isLiked) return res.status(200).send(true);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating Comment", error: error.message });
  }
};
