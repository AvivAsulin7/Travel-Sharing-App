import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

import travelsRouter from "./routes/travelsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import { HttpError } from "./models/HttpError.js";

const app = express();
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images"))); // in order to return images from this path to frontend

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/travels", travelsRouter); //connect to travels-routes + every route from thi file will start with /travels
app.use("/users", usersRouter);

app.use((req, res, next) => {
  const err = new HttpError("Could no find this route", 404);
  throw err;
});
//
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "GENERAL ERROR" });
});

mongoose
  .connect(
    "mongodb+srv://Aviv852456:Aviv852456@travelapp.stgh0op.mongodb.net/fullstack?retryWrites=true&w=majority",
    {
      useNewUrlPArser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
