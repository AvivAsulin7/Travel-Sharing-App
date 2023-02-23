import mongoose from "mongoose";

const TravelScehma = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export const Travel = mongoose.model("Travel", TravelScehma);
