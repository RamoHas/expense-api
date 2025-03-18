import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(normalize);
export const UserModel = model("User", userSchema);
