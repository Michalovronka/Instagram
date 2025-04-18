import express from "express";
import { createComment, getAllCommentsFromContent, getComment } from "../controllers/comment/commentController";

const router = express.Router();


router.post("/create", createComment as any)
router.get("/allOnContent/:id", getAllCommentsFromContent as any)
router.get("/:id", getComment as any )
export default router;