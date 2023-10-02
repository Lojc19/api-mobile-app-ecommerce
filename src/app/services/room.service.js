const Room = require("../models/room.model");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register 
const createRoom = asyncHandler(async (nameRoom) => {
  try {
    const newRoom = await Room.create({nameRoom: nameRoom});
    return newRoom;
  } catch (error) {
    throw new Error(error);
  }
});

const getaRoom = asyncHandler(async(id) => {
  const room = await Room.findById(id);
  return room; 
});

module.exports = { createRoom, getaRoom };