import express from "express";
import { check } from "express-validator";
import checkAuth from "../middleware/checkAuth.js";
import {
  signIn,
  signUp,
  getUsers,
  getSpecificUser,
  deleteUser,
} from "../controllers/usersControllers.js";

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
router.post("/signin", signIn);
router.get("/:userId", getSpecificUser);

router.use(checkAuth);

router.delete("/delete/:userId", deleteUser);

export default router;
