import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { getCoordinates } from "../util/location.js";

let DUMMY_TRAVELS = [
  {
    id: "p1",
    title: "Madrid",
    description: "One of the most famous cities in the world !",
    image:
      "https://www.travelandleisure.com/thmb/RSoOIuu5uFZcZEUnTh9X8hNZvCk=/1800x1200/filters:fill(auto,1)/aerial-madrid-MADRIDREN1021-b0d6169b39884280ac131f0c3d233623.jpg",
    location: {
      lat: 40.4379543,
      lng: -3.6795367,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "London",
    description: "One of the most famous cities in the world !",
    dates: "17-22 october 22",
    image:
      "https://a.cdn-hotels.com/gdcs/production55/d1816/e4f30f70-a6c6-11e8-bc7c-0242ac110002.jpg",
    location: {
      lat: 51.5286416,
      lng: -0.1015987,
    },
    creator: "u2",
  },
];

///////////////////////////////////////////////////////////////////////////////////////////////

export const getTravelById = (req, res) => {
  const TravelId = req.params.pid;
  const travel = DUMMY_TRAVELS.find((p) => {
    return p.id === TravelId;
  });
  res.json({ travel });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const getTravelsByUserId = (req, res) => {
  const userId = req.params.uid;
  const travels = DUMMY_TRAVELS.filter((p) => {
    return p.creator === userId;
  });
  res.json({ travels });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const createTravel = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.json({ message: "Invalid inputs , please check your data!" });

  const { title, description, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinates(title);
    if (coordinates === 0)
      res.json({
        message: "Could not find location for the specified address",
      });
  } catch (error) {
    res.json(error);
  }

  const createdTravel = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    creator,
  };
  DUMMY_TRAVELS.push(createdTravel);
  res.status(201).json({ createdTravel });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const updateTravel = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.json({ message: "Invalid inputs , please check your data!" });
  const { title, description } = req.body;
  const travelId = req.params.pid;
  const travel = DUMMY_TRAVELS.find((p) => p.id === travelId);
  const travelIndex = DUMMY_TRAVELS.findIndex((p) => p.id === travelId);
  travel.title = title;
  travel.description = description;
  DUMMY_TRAVELS[travelIndex] = travel;

  res.status(200).json({ travel });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const deleteTravel = (req, res) => {
  const travelId = req.params.pid;
  if (!DUMMY_TRAVELS.find((p) => p.id === travelId))
    res.json({ message: "could not find a travel with this id" });
  DUMMY_TRAVELS = DUMMY_TRAVELS.filter((p) => p.id !== travelId);
  res.status(200).json({ message: "Deleted Travel" });
};
