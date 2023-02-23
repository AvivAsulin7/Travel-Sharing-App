import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, required: true },
  travels: [{ type: mongoose.Types.ObjectId, required: true, ref: "Travel" }],
});

UserSchema.plugin(uniqueValidator);

export const User = mongoose.model("User", UserSchema);
