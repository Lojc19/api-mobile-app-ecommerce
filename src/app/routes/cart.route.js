const express = require("express");
const { addtoCart, getCart } = require("../controllers/cart.controller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware"); 
const router = express.Router();

// create
router.post("/addtoCart",authMiddleware, addtoCart);

router.get("/getCart", authMiddleware, getCart);

module.exports = router;