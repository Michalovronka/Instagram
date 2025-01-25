import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({

  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeOnType: {
    type: String,
    enum: ["Upload", "Reel", "Comment"],
    required: true,
  },
  likeOnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "contentType",
  },
  dateOfCreation: { type: Date, required: true, default: Date.now },

});

//refType is built-in mongoose feature that allows us to reference different models based on the value of another field

export default mongoose.model("Like", likesSchema);
