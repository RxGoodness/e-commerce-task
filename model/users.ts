import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Enter valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdminDB", AdminSchema);



