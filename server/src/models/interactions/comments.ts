import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({

  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentOnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "contentType",
  },
  text: { type: String, required: true },
  dateOfCreation: { type: Date, default: Date.now },
  numberOfLikes: { type: Number, default: 0 },
});

export default mongoose.model("Comment", commentsSchema);