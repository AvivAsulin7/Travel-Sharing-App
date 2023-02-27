import jwt from "jsonwebtoken";
import { HttpError } from "../models/HttpError.js";
import dotenv from "dotenv";

dotenv.config();

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedtoken = jwt.verify(token, process.env.SECRET); // decoded = payload
    req.userDate = { userId: decodedtoken.userId };
    next();
  } catch (error) {
    const err = new HttpError("Authentication failed !", 403);
    return next(err);
  }
};

export default checkAuth;
