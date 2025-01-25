import mongoose from "mongoose";

const profilesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: { type: String, required: true },
  highlights: { type: [mongoose.Schema.Types.ObjectId], required: true, default: [] },
  tagged: { type: [mongoose.Schema.Types.ObjectId], ref: "Upload", required: true, default: [] },
  following: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'User', 
    required: true, 
    default: []
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'User', 
    required: true, 
    default: []
  }
});

export default mongoose.model("Profile", profilesSchema);