import { mongoose } from "mongoose";
import { validationResult } from "express-validator";
import { HttpError } from "../models/HttpError.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Travel } from "../models/Travel.js";

dotenv.config();

////////////////////////////////////////////////////////////////////////////////////

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(new HttpError("Getting users failed, please try again.", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

////////////////////////////////////////////////////////////////////////////////////

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(new HttpError("Invalid inputs , please check your data!", 422));
  const user = req.body;
  const { name, email, password, image, city, age } = user;

  let existUser;
  try {
    existUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Signing Up failed , please try again.", 500));
  }

  if (existUser) {
    console.log(existUser);
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Could no create user, please try again.", 500);
    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image,
    city,
    age,
    travels: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Signing Up failed , please try again!", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    const err = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(err);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

////////////////////////////////////////////////////////////////////////////////////

export const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(HttpError("Invalid inputs , please check your data.", 422));
  const user = req.body;
  const { email, password } = user;
  const emaill = email.toLowerCase();

  let existUser;
  try {
    existUser = await User.findOne({ email: emaill });
  } catch (error) {
    return next(new HttpError("Logging in failed , please try again.", 500));
  }

  if (!existUser) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existUser.password);
  } catch (error) {
    err = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(err);
  }

  if (!isValidPassword) {
    const err = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existUser.id, email: existUser.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    const err = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(err);
  }

  res.json({ userId: existUser.id, email: existUser.email, token: token });
};

///////////////////////////////////

export const getSpecificUser = async (req, res, next) => {
  const { userId } = req.params;
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Getting user failed, please try again.", 500));
  }
  if (!user) {
    return next(new HttpError("Getting user failed, please try again.", 500));
  }
  res.json({ user: user.toObject({ getters: true }) });
};

/////////////////////////////////////////

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  let user;
  try {
    user = await User.findById(userId).populate("travels");
  } catch (error) {
    return next(new HttpError("Deleting user failed, please try again.", 500));
  }

  if (!user) {
    return next(
      new HttpError("Deleting user failed, please try again. !", 500)
    );
  }
  if (user.id !== req.userDate.userId) {
    return next(
      new HttpError("You have no credetials to delete this acount!", 401)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await Travel.deleteMany({ creator: userId }, { session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete user.", 500)
    );
  }
  res.status(200).json({ message: "Deleted User" });
};
