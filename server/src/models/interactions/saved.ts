import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({

  savedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedOnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateOfCreation: { type: Date, required: true, default: Date.now },

});

export default mongoose.model("Saved", savedSchema);
