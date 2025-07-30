import { Types } from "mongoose";

export enum RideStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REJECTED = "rejected",
}

export interface IRide {
  rider: Types.ObjectId | string;
  driver?: Types.ObjectId | string;
  pickupLocation: string;
  dropOffLocation: string;
  status?: RideStatus;
  fare?: number;
  timestamps?: Record<string, Date>;
}
