import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({

  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeOnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateOfCreation: { type: Date, required: true, default: Date.now },

});

export default mongoose.model("Like", likesSchema);
