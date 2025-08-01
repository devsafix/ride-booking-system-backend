import { model, Schema } from "mongoose";
import { IRide, RideStatus } from "./ride.interface";

const rideSchema = new Schema<IRide>(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pickupLocation: {
      type: Schema.Types.Mixed,
      required: true,
    },
    dropOffLocation: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
      required: true,
    },
    fare: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: Object.values(RideStatus),
          required: true,
        },
        _id: false,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Mongoose Pre-save hook to add a new status to the history
rideSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
    });
  }
  next();
});

export const Ride = model<IRide>("Ride", rideSchema);
