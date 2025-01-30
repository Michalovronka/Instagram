import mongoose from "mongoose";

const userAuthsSchema = new mongoose.Schema({
  referencesUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true } //TODO: make this check if its a email and not other string 
});

export default mongoose.model("UserAuth", userAuthsSchema);
