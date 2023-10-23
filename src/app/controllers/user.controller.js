const User = require("../models/user.model");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");
const { generateToken } = require("../../config/jwtToken");
const { generateRefreshToken } = require("../../config/refreshtoken");
const userService = require("../services/user.service")

const jwt = require("jsonwebtoken");

// register User 
const createUser = asyncHandler(async (req, res) => {
    const data = await userService.createUser(req.body);
    res.json({
      status: "success",
      data,
    });
});

// login with username password
const loginUserWithUsernamePassword = asyncHandler(async (req,res) => {
    const { username, password } = req.body;
    const data = await userService.loginUserWithUsernamePassword(username, password);
    res.json({
      status: "success",
      data
    })
});


// get all user
const getallUser = asyncHandler(async (req, res) => {
  const data = await userService.getallUser();
  res.json({
    status: "success",
    data,
  })
});

// get info 1 user 
const getaUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const data = await userService.getaUser(_id);
    res.json({
      status: "success",
      data,
    });
});


// update user
const updatedUser = asyncHandler(async (req, res) => {
  const { _id }= req.user;
  const data = await userService.updatedUser(_id,req.body);
  res.json({
    status: "success",
    data,
  });
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