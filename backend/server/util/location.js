import axios from "axios";
import dotenv from "dotenv";
import { HttpError } from "../models/HttpError.js";

dotenv.config();

const key = process.env.API_KEY;

export const getCoordinates = async (address) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${key}`
  );

  const data = res.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};
