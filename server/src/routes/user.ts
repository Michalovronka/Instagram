import express from "express";
import { getUser, updateUser, updatePfp, deleteUser, getUserById, searchUsers } from "../controllers/user/userController";
import { registerUser } from "../controllers/user/registration";

const router = express.Router();

//TODO: make authentication work (no userNames only in get)

router.get("/:username", getUser as any);
router.get("/getById/:id", getUserById as any);
router.get("/search/:username", searchUsers as any);
router.patch("/updateInfo/:username", updateUser as any);
router.patch("/updatePfp/:username", updatePfp);
router.post("/registration", registerUser);
router.delete("/:username", deleteUser as any); 

export default router;
