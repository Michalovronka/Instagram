import express from "express";
const router = express.Router();

router.get("/:userName");
router.patch("/:userName");
router.delete("/:userName"); 

export default router;
