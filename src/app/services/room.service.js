const Room = require("../models/room.model");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register 
const createRoom = asyncHandler(async (room) => {
    const findRoom = await Room.findOne({ room: room });
    if (!findRoom) {
      const newRoom = await Category.create({room: room});
      return newRoom
    } else {
      throw new Error("Err");
    }
});

const getaRoom = asyncHandler(async(id) => {
  const room = await Room.findById(id);
  return room; 
});

module.exports = { createRoom, getaRoom };