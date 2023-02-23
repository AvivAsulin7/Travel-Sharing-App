import express from "express";
import { check } from "express-validator";
import {
  getTravelById,
  getTravelsByUserId,
  createTravel,
  updateTravel,
  deleteTravel,
} from "../controllers/travelsContorllers.js";
import imageUpload from "../middleware/imageUpload.js";

const router = express.Router();

router.get("/:pid", getTravelById);
router.get("/user/:uid", getTravelsByUserId);
router.post(
  "/newTravel",
  imageUpload.single("image"),
  [(check("title").not().isEmpty(), check("description").isLength({ min: 5 }))],
  createTravel
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updateTravel
);
router.delete("/:pid", deleteTravel);

export default router;
