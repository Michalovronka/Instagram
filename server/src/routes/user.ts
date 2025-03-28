import express from "express";
import { getUser, updateUser, updatePfp, deleteUser } from "../controllers/user/userController";
import { registerUser } from "../controllers/user/registration";
import { LogIn } from "../controllers/authentication/authenticationLogging";

const router = express.Router();

//TODO: make authentication work (no userNames only in get)

router.get("/:username", getUser as any);
router.patch("/updateInfo/:username", updateUser as any);
router.patch("/updatePfp/:username", updatePfp);
router.post("/registration", registerUser);
router.delete("/:username", deleteUser as any); 

export default router;
