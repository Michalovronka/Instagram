import express from "express";
import { createLike, deleteLike, isContentLiked } from "../controllers/like/likeController";
import { createSaved, deleteSaved, getAllSaved, isContentSaved } from "../controllers/saved/savedContoller";

const router = express.Router();

router.post("/create/:contentId/:username", createSaved as any)
router.get("/isSaved/:contentId/:username", isContentSaved as any)
router.delete("/delete/:contentId/:username", deleteSaved as any)
router.get("/getAllSavedByUser/:username", getAllSaved as any)
export default router;