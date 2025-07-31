import { ILocation } from "../modules/ride/ride.interface";

const getDistance = (loc1: ILocation, loc2: ILocation): number => {
  const R = 6371;
  const dLat = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
  const dLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.latitude * Math.PI) / 180) *
      Math.cos((loc2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

export const calculateFare = (
  pickupLocation: ILocation,
  dropOffLocation: ILocation
): number => {
  const distanceInKm = getDistance(pickupLocation, dropOffLocation);

  const baseFare = 50; // A base fare in your local currency
  const ratePerKm = 15; // Rate per kilometer
  const bookingFee = 5; // A small booking fee

  // Calculate the total fare
  const totalFare = baseFare + distanceInKm * ratePerKm + bookingFee;

  return Math.floor(totalFare);
};
