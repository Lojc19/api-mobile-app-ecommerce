const express = require("express");
const { createRoom, getaRoom} = require("../controllers/room.controller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware"); 
const router = express.Router();

// create
router.post("/create-room",authMiddleware, isAdmin, createRoom);

router.get("/getaRoom/:id", getaRoom);

module.exports = router;