import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, default: ""},
  pfpSrc: { type: String, required: true, default: "http://localhost:3000/defaultImages/default_Pfp.png"},
});

export default mongoose.model("User", usersSchema);