import mongoose from "mongoose";

const reelsSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentSrc: { type: String, required: true },
  dateOfCreation: { type: Date, required: true, default: Date.now },
  numberOfComments: { type: Number, required: true, default: 0 },
  numberOfLikes: { type: Number, required: true, default: 0 },
});

export default mongoose.model("Reel", reelsSchema);
