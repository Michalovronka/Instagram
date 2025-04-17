import express from "express";
import { createLike, deleteLike, isContentLiked } from "../controllers/like/likeController";

const router = express.Router();

router.post("/create/:contentId/:username", createLike as any)
router.get("/isLiked/:contentId/:username", isContentLiked as any)
router.delete("/delete/:contentId/:username", deleteLike as any)
export default router;