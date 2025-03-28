import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (input: string) => {
        return input.length >= 1 && input.length <= 20;
      },
      message: "Username must be between 1 and 20 characters long.",
    },
  },
  displayName: {
    type: String,
    required: true,
    default: "",
    validator: (input: string) => {
      return input.length >= 0 && input.length <= 20;
    },
    message: "Display Name must be between 0 and 20 characters long.",
  },
  pfpSrc: {
    type: String,
    required: true,
    default: "http://localhost:3000/defaultImages/default_Pfp.png",
  },
});

export default mongoose.model("User", usersSchema);
