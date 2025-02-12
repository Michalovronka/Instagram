import mongoose from "mongoose";
import validator from "validator";

const profilesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "",
    validate: {
      validator: (input: string) => {
        return input.length >= 0 && input.length <= 100;
      },
      message: "Bio must be between 0 and 100 characters long.",
    },
  },
  highlights: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Story",
    required: true,
    default: [],
  },
  tagged: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Upload",
    required: true,
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
});

export default mongoose.model("Profile", profilesSchema);
