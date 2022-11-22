import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

let USERS = [
  {
    id: "u1",
    name: "Aviv Asulin",
    email: "avivasulin1211@gmail.com",
    passowrd: "test",
  },
];

////////////////////////////////////////////////////////////////////////////////////

export const getUsers = (req, res) => {
  res.json({ USERS });
};

////////////////////////////////////////////////////////////////////////////////////

export const signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.json({ message: "Invalid inputs , please check your data!" });

  const { name, email, password } = req.body;

  const existUser = USERS.find((u) => u.email === email);
  if (existUser) res.json({ message: "error, email already exsits !" });
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  USERS.push(createdUser);
  res.status(201).json({ createdUser });
};

////////////////////////////////////////////////////////////////////////////////////

export const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.json({ message: "Invalid inputs , please check your data!" });

  const { email, password } = req.body;

  const user = USERS.find((u) => u.email === email);
  if (!user || user.passowrd !== password)
    res.json({ message: "there is wrong with some details" });

  res.json({ message: "Logged in!" });
};
