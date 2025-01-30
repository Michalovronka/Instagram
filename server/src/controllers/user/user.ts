import User from "../../models/users";
import pfpController from "./pfpController";
import { Response, Request, NextFunction } from "express";
import path from "path";


exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const user = await User.findById(req.params.id).select("-__v");
    if (user) {
      return res.status(200).json({
        payload: user,
        msg: "User found!",
      });
    }
    res.status(500).json({ msg: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      msg: "User deleted successfully",
      payload: user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//TODO
exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userName, displayName } = req.body;

  if (!userName || !displayName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id).select("-__v");
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


