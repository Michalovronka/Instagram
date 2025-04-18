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

export const addFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loggedInUsername, profileUsername } = req.params;

  try {
    const loggedInUser = await User.findOne({ userName: loggedInUsername });
    const profileUser = await User.findOne({ userName: profileUsername });

    if (!loggedInUser || !profileUser)
      return res.status(500).send("One of the users not found");

    await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      { $push: { following: profileUser._id } },
      { new: true }
    );
    await Profile.findOneAndUpdate(
      { user: profileUser._id },
      { $push: { followers: loggedInUser._id } },
      { new: true }
    );

    return res.status(200).send("Following and Follower added");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const deleteFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loggedInUsername, profileUsername } = req.params;

  try {
    const loggedInUser = await User.findOne({ userName: loggedInUsername });
    const profileUser = await User.findOne({ userName: profileUsername });

    if (!loggedInUser || !profileUser)
      return res.status(500).send("One of the users not found");

    await Profile.findOneAndUpdate(
      { user: loggedInUser._id },
      { $pull: { following: profileUser._id } },
      { new: true }
    );
    await Profile.findOneAndUpdate(
      { user: profileUser._id },
      { $pull: { followers: loggedInUser._id } },
      { new: true }
    );

    return res.status(200).send("Following and Follower added");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const checkIsFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loggedInUsername, profileUsername } = req.params;

  try {
    const loggedInUser = await User.findOne({ userName: loggedInUsername });
    const profileUser = await User.findOne({ userName: profileUsername });

    if (!loggedInUser || !profileUser)
      return res.status(500).send("One of the users not found");

    const isFollowing = await Profile.findOne({
      user: loggedInUser._id,
      following: { $in: [profileUser._id] },
    });

    if (!isFollowing) return res.status(200).send(false);
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const getAllFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(500).send("User not found");

    const profile = await Profile.findOne({ user: user._id });
    if (!profile) return res.status(500).send("Profile not found");

    if (!profile.followers)
      return res.status(404).send("Following not found");

    const usersdata: {
      userName: string;
      displayName: string;
      pfpSrc: string;
    }[] = [];
    for (const followersProfile of profile.followers) {
      const currentUser = await User.findById(followersProfile);
      if (currentUser) {
        usersdata.push({
          userName: currentUser.userName,
          displayName: currentUser.displayName,
          pfpSrc: currentUser.pfpSrc,
        });
      }
    }
    return res.status(200).json(usersdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

export const getAllFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(500).send("User not found");

    const profile = await Profile.findOne({ user: user._id });
    if (!profile) return res.status(500).send("Profile not found");

    if (!profile.following || profile.following.length === 0)
      return res.status(404).send("Following not found");

    const usersdata: {
      userName: string;
      displayName: string;
      pfpSrc: string;
    }[] = [];
    for (const followedProfile of profile.following) {
      const currentUser = await User.findById(followedProfile);
      if (currentUser) {
        usersdata.push({
          userName: currentUser.userName,
          displayName: currentUser.displayName,
          pfpSrc: currentUser.pfpSrc,
        });
      }
    }
    return res.status(200).json(usersdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
