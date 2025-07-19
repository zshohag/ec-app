// models/User.ts
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // ✅ Default role
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
