import express from "express";
import { getUpload, createUpload, getAllUploadsByUser, getAllUploadsByFollowedUsers} from "../controllers/upload/uploadController";

const router = express.Router();

//TODO: get and update (adding highlightes storeies...)
//and import it in index

router.get("/:id", getUpload as any);
router.get("/getAllUploadsByUser/:username", getAllUploadsByUser as any);
router.get("/getAllUploadsByFollowedUsers/:username", getAllUploadsByFollowedUsers as any);
router.post("/createUpload", createUpload)
router.patch("/:id");
router.delete("/:id");

export default router;