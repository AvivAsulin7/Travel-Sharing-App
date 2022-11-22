import express from "express";
import { check } from "express-validator";
import { signIn, signUp, getUsers } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUp
);
router.post("/:signin", signIn);

export default router;
