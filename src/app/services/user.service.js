const User = require("../models/user.model");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");
const { generateToken } = require("../../config/jwtToken");
const { generateRefreshToken } = require("../../config/refreshtoken");

const jwt = require('jsonwebtoken');

// register User 
const createUser = asyncHandler(async (dataReq) => {
    const findUser = await User.findOne({ username: dataReq.username });
    const findPhoneUser = await User.findOne({ phoneNumber: dataReq.phoneNumber });
    const findMailUser = await User.findOne({ email: dataReq.email });
    if(findPhoneUser) {
      throw new Error("Phone number already exists");
    }
    if (findMailUser) {
      throw new Error("Email already Exists");
    }

    if (!findUser) {
      const newUser = await User.create(dataReq);
      return newUser;
    } else {
      throw new Error("Username already exists");
    }
});

// login with username password
const loginUserWithUsernamePassword = asyncHandler(async (req,res) => {
    const { username, password } = req.body;
    const findUser = await User.findOne({username: username});

    if(findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            status: "success",
            message: "Login",
            data: {
              _id: findUser?._id,
              firstname: findUser?.firstname,
              lastname: findUser?.lastname,
              email: findUser?.email,
              phone: findUser?.phone,
              token: generateToken(findUser?.username),
            },
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


// get all user
const getallUser = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
});

// get info 1 user 
const getaUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    try {
      const getaUser = await User.findById(_id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
});


// update user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          phone: req?.body?.phone,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
});

// delete user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {createUser, loginUserWithUsernamePassword, getallUser, getaUser, updatedUser, deleteaUser};