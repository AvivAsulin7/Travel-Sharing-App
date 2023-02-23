import express from "express";
import { check } from "express-validator";
import {
  signIn,
  signUp,
  getUsers,
  getSpecificUser,
} from "../controllers/usersControllers.js";
import imageUpload from "../middleware/imageUpload.js";

const router = express.Router();

router.get("/", getUsers);
router.post(
  "/signup",
  imageUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUp
);
router.post("/signin", signIn);
router.get("/:userId", getSpecificUser);

export default router;
