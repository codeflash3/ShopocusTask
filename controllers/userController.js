import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//To generate custom error messages
const handlerErrors = (err) => {
  let errors = { email: " ", password: " " };

  //   duplicate error codes
  if (err.code === 11000) {
    errors.email = "User already exists";
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//@desc Register User and get token
//@route POST /api/users/login
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    res.status(400).send("Invalid user data");
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    const err = handlerErrors(error);
    res.status(400).send(err);
  }
});

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "User with given mail doesn't exists" });
  }
  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: "Invalid password" });
  }
});
//@desc Get logedIn user profile
//@route GET /api/users/profile
//@access Private
const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export { registerUser, authUser, getProfile };
