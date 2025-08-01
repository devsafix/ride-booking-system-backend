import { Types } from "mongoose";

export interface IFeedback {
  rating: number;
  comment?: string;
  rider: Types.ObjectId;
  driver: Types.ObjectId;
  ride: Types.ObjectId;
}
