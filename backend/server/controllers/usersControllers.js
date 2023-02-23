import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { HttpError } from "../models/HttpError.js";
import { User } from "../models/User.js";

////////////////////////////////////////////////////////////////////////////////////

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    console.log(users);
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
  const { name, email, password, city, age } = user;
  console.log(age);
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

  const createdUser = new User({
    name,
    email,
    password,
    image: req.file.path,
    city,
    age,
    travels: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Signing Up failed , please try again.", 500));
  }

  res
    .status(201)
    .json({ createdUser: createdUser.toObject({ getters: true }) });
};

////////////////////////////////////////////////////////////////////////////////////

export const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(HttpError("Invalid inputs , please check your data.", 422));
  const user = req.body;
  const { email, password } = user;

  let existUser;

  try {
    existUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Logging in failed , please try again.", 500));
  }

  if (!existUser || existUser.password !== password) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 500)
    );
  }

  res.json({
    message: "Logged in!",
    user: existUser.toObject({ getters: true }),
  });
};

///////////////////////////////////

export const getSpecificUser = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  let user;
  try {
    user = await User.findById(userId);
    console.log(user);
  } catch (error) {
    return next(new HttpError("Getting user failed, please try again.", 500));
  }
  res.json({ user: user.toObject({ getters: true }) });
};
