const express = require("express");
const { createUser, loginUserWithUsernamePassword, getallUser,getaUser,updatedUser, deleteaUser } = require("../controllers/user.controller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware"); 
const router = express.Router();

// register
router.post("/register", createUser);
// login
router.post("/login", loginUserWithUsernamePassword);
// get all user
router.get("/all-users",authMiddleware, isAdmin, getallUser);
// get info user
router.get("/info-user",authMiddleware, getaUser);
// update user
router.put("/update-user",authMiddleware, updatedUser);
// delete user
router.delete("/delete-user/:id",authMiddleware, isAdmin, deleteaUser);

module.exports = router;