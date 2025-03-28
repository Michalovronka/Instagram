import express from "express";
import { getProfile } from "../controllers/profileController";

const router = express.Router();

//TODO: get and update (adding highlightes storeies...)
//and import it in index

router.get("/:username", getProfile as any);
router.patch("/:username");

export default router;