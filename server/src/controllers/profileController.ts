import { Response, Request, NextFunction } from "express";
import Profile from "../models/profiles";

// POST & DELETE ARE CONNECTED WITH USER
// make updates if i want to add highlights, stories... 

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userName } = req.params;
      const profile = await Profile.findOne({ userName: userName });
      if (profile) {
        return res.status(200).json({
          payload: profile,
          msg: "Profile found!",
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