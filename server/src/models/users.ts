import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  displayName: { type: String, required: true },
  pfpSrc: { type: String, required: true },
  
});

export default mongoose.model("User", usersSchema);