import mongoose from "mongoose";

const uploadsSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentSrc: { type: String, required: true },
  description: {
    type: String,
    validate: {
      validator: (input: string) => {
        return input.length >= 0 && input.length <= 200;
      },
      message: "Description must be between 0 and 200 characters long.",
    },
  },
  dateOfCreation: { type: Date, required: true, default: Date.now },
  numberOfComments: { type: Number, required: true, default: 0 },
  numberOfLikes: { type: Number, required: true, default: 0 },
});

export default mongoose.model("Upload", uploadsSchema);
