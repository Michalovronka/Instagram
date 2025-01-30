import express from "express";
import registerUser from "../controllers/user/registration"
const router = express.Router();

router.post("/", registerUser);

export default router;
