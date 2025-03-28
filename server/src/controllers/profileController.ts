import { Response, Request, NextFunction } from "express";
import Profile from "../models/profiles";
import User from "../models/users";
// POST & DELETE ARE CONNECTED WITH USER
// make updates if i want to add highlights, stories...

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const profile = await Profile.findOne({ user: user._id });
    if (profile) {
      return res.status(200).json({
        bio: profile.bio,
        highlights: profile.highlights,
        tagged: profile.tagged,
        following: profile.following,
        followers: profile.followers,
      });
    }
    res.status(404).json({ msg: "Profile not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
