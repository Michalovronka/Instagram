import express from "express";
import { addFollowing, checkIsFollowing, deleteFollowing, getAllFollowers, getAllFollowing, getProfile } from "../controllers/profileController";

const router = express.Router();

//TODO: get and update (adding highlightes storeies...)
//and import it in index

router.get("/:username", getProfile as any);
router.post("/addFollower/:loggedInUsername/:profileUsername", addFollowing as any);
router.delete("/deleteFollower/:loggedInUsername/:profileUsername", deleteFollowing as any);
router.get("/isFollowing/:loggedInUsername/:profileUsername", checkIsFollowing as any);
router.get("/getAllFollowers/:username", getAllFollowers as any);
router.get("/getAllFollowing/:username", getAllFollowing as any);

export default router;