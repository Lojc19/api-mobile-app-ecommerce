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
      message: "Đăng kí thành công"
    });
});

// login with username password
const loginUser = asyncHandler(async (req,res) => {
    const { username, password } = req.body;
    const data = await userService.loginUser(username, password);
    res.json({
      status: "success",
      data,
      message: "Đăng nhập thành công"
    })
});


// get all user
const getallUser = asyncHandler(async (req, res) => {
  const data = await userService.getallUser();
  res.json({
    status: "success",
    data,
    message: "",
  })
});

// get info 1 user 
const getaUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const data = await userService.getaUser(_id);
    res.json({
      status: "success",
      data,
      message: "",
    });
});


// update user
const updatedUser = asyncHandler(async (req, res) => {
  const { _id }= req.user;
  const data = await userService.updatedUser(_id,req.body);
  res.json({
    status: "success",
    data,
    message: "Cập nhật thông tin thành công",
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

module.exports = {createUser, loginUser, getallUser, getaUser, updatedUser, deleteaUser};