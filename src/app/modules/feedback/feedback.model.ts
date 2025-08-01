import { Schema, model } from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback>(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    rider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ride: {
      type: Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
