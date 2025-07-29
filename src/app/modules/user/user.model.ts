import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "rider", "driver"],
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_SALT_ROUND)
  );
  next();
});

export const User = model<IUser>("User", userSchema);
