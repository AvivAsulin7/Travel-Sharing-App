import axios from "axios";
import dotenv from "dotenv";

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
    const coordinates = 0;
    return coordinates;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};
