import mongoose from "mongoose";

const storiesSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentSrc: { type: String, required: true },
  dateOfCreation: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Story", storiesSchema);
