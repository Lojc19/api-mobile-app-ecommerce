const Category = require("../models/category.model");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require("jsonwebtoken");

// register createCate 
const createCate = asyncHandler(async (nameCate) => {
  try {
    const newCategory = await Category.create({nameCate: nameCate});
    return newCategory;
  } catch (error) {
    throw new Error(error);
  }
});

const getaCategory = asyncHandler(async(id) => {
  const cate = await Category.findById(id);
  return cate; 
});

module.exports = { createCate, getaCategory };