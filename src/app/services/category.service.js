const Category = require("../models/category.model");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register createCate 
const createCate = asyncHandler(async (category) => {
    const findCategory = await Category.findOne({ category: category });
    if (!findCategory) {
      const newCategory = await Category.create({category: category});
      return newCategory
    } else {
      throw new Error("Err");
    }
});

const getaCategory = asyncHandler(async(id) => {
  const cate = await Category.findById(id);
  return cate; 
});

module.exports = { createCate, getaCategory };