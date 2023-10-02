const Room = require("../models/room.model");
const roomService = require("../services/room.service")
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register User 
const createRoom = asyncHandler(async (req, res) => {
  const { nameRoom } = req.body;
  const data = await roomService.createRoom(nameRoom)
  res.json({
    status:"success",
    data
  })
});

const getaRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await roomService.getaRoom(id);
  res.json({
    status: "success",
    data
  })
});

module.exports = {createRoom,getaRoom};