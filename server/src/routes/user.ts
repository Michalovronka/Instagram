import express from "express";
import { getUser, updateUser, updatePfp, deleteUser } from "../controllers/user/userController";
import { registerUser } from "../controllers/user/registration";
import { LogIn } from "../controllers/authentication/authenticationLogging";

const router = express.Router();

//TODO: make authentication work (no userNames only in get)

router.get("/:userName", getUser as any);
router.patch("/updateInfo/:userNameParam", updateUser as any);
router.patch("/updatePfp/:userName", updatePfp as any);
router.post("/registration", registerUser, LogIn as any);
router.delete("/:userName", deleteUser as any); 

export default router;
