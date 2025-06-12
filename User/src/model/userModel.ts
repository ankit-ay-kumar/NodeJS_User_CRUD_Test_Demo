import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    age: { type: Number, required: true, min: 2 },
    department: { type: String, required: true },
  },
  {
    collection: "user_master",
  }
);

export const UserData = mongoose.model("User", userSchema, "user_master");
