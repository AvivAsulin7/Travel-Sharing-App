import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { validationResult } from "express-validator";
import { getCoordinates } from "../util/location.js";
import { HttpError } from "../models/HttpError.js";
import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";
import { mongoose } from "mongoose";

///////////////////////////////////////////////////////////////////////////////////////////////

export const getTravelById = async (req, res, next) => {
  const TravelId = req.params.pid;
  let travel;
  try {
    travel = await Travel.findById(TravelId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong , Could not find a travel", 500)
    );
  }

  if (!travel) {
    throw new HttpError("Could not find a travel for the provided id.", 404);
  }

  res.json({ travel: travel.toObject({ getters: true }) });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const getTravelsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let travels;

  try {
    travels = await Travel.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("Failed , please try again!", 500));
  }

  if (!travels || travels.length === 0) {
    return next(
      new HttpError("Could not find travels for the provided user id.", 404)
    );
  }

  res.json({ travels: travels.map((t) => t.toObject({ getters: true })) });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const createTravel = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    next(new HttpError("Invalid inputs passed, please check your data.", 422));

  const { title, header, description, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinates(title);
  } catch (error) {
    return next(error);
  }

  const createdTravel = new Travel({
    title,
    header,
    description,
    location: coordinates,
    image: req.file.path,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError("Creating travel failed, please try again.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTravel.save({ session: sess });
    user.travels.push(createdTravel);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Creating Travel failed , please try again!", 500)
    );
  }

  res.status(201).json({ createdTravel });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const updateTravel = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      HttpError("Invalid inputs passed, please check your data.", 422)
    );

  const { header, description } = req.body;
  const travelId = req.params.pid;

  let travel;
  try {
    travel = await Travel.findById(travelId);
  } catch (error) {
    return next(new HttpError("Could not update travel", 500));
  }

  if (travel.creator.toString() !== req.userDate.userId) {
    return next(
      new HttpError("You have no credetials to edit this travels!", 401)
    );
  }

  travel.header = header;
  travel.description = description;

  try {
    await travel.save();
  } catch (error) {
    return next(new HttpError("Could not update travel", 500));
  }

  res.status(200).json({ travel: travel.toObject({ getters: true }) });
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const deleteTravel = async (req, res, next) => {
  const travelId = req.params.pid;

  let deletedTravel;
  try {
    deletedTravel = await Travel.findById(travelId).populate("creator");
  } catch (error) {
    return next(
      new HttpError("Could not success to delete , please try again!")
    );
  }

  if (!deletedTravel) {
    return next(new HttpError("Could not find travel for this id", 500));
  }

  if (deletedTravel.creator.id !== req.userDate.userId) {
    return next(
      new HttpError("You have no credetials to delete this travels!", 401)
    );
  }

  const deletedImagePath = deletedTravel.image;

  try {
    console.log(deletedTravel);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await deletedTravel.remove({ session: sess });
    await deletedTravel.creator.travels.pull(deletedTravel);
    await deletedTravel.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete travel.", 500)
    );
  }

  fs.unlink(deletedImagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ deletedTravel, message: "Deleted Travel" });
};
