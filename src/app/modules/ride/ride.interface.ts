import { Types } from "mongoose";

export enum RideStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REJECTED = "rejected",
  NO_DRIVER_FOUND = "no_driver_found",
}

// Using a more scalable location schema
export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface IRide {
  rider: Types.ObjectId | string;
  driver?: Types.ObjectId | string;
  pickupLocation: ILocation;
  dropOffLocation: ILocation;
  status: RideStatus;
  fare: number;
  feedback?: string;
  createdAt?: Date;
  statusHistory: {
    status: RideStatus;
    timestamp: Date;
  }[];
}
