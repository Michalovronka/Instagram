import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({

  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentOnType: {
    type: String,
    enum: ["Upload", "Reel", "Comment"],
    required: true,
  },
  commentOnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "contentType",
  },

  text: { type: String, required: true },
  dateOfCreation: { type: Date, required: true, default: Date.now },

});

export default mongoose.model("Like", commentsSchema);