import express from "express";
import { LogIn, LogOut } from "../controllers/authentication/authenticationLogging";
import { Verify, getUserfromToken} from "../controllers/authentication/authenticationUtils";
import { getUser } from "../controllers/user/userController";

const router = express.Router();

router.post("/login", LogIn as any);
router.post("/logOut", LogOut as any);
router.post("/getToken", Verify as any);
router.get("/getUsernameFromToken", getUserfromToken as any);
router.get("/getLoggedInUserInfo", getUserfromToken as any, getUser as any)

export default router;