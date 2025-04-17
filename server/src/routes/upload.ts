import express from "express";
import { getUpload, createUpload, getAllUploadsByUser} from "../controllers/upload/uploadController";

const router = express.Router();

//TODO: get and update (adding highlightes storeies...)
//and import it in index

router.get("/:id", getUpload as any);
router.get("/getAllUploadsByUser/:username", getAllUploadsByUser as any);
router.post("/createUpload", createUpload)
router.patch("/:id");
router.delete("/:id");

export default router;