import mongoose from "mongoose";
import validator from "validator";

const userAuthsSchema = new mongoose.Schema({
  referencesUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  password: { type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email address"
    }
    //check for correct email string in front end 
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshtoken: {
    type: String,
  }
});

export default mongoose.model("UserAuth", userAuthsSchema);
