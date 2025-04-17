import express from "express";
import { createComment, getAllCommentsFromUpload, getComment } from "../controllers/comment/commentController";

const router = express.Router();


router.post("/create", createComment as any)
router.get("/allOnUpload/:id", getAllCommentsFromUpload as any)
router.get("/:id", getComment as any )
export default router;