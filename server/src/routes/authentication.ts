import express from "express";
import { LogIn, LogOut } from "../controllers/authentication/authenticationLogging";
import { Verify } from "../controllers/authentication/authenticationUtils";

const router = express.Router();

router.post("/login", LogIn as any);
router.post("/logOut", LogOut as any);
router.post("/getToken", Verify as any);

export default router;