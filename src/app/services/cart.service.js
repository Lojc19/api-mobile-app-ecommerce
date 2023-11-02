const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../../utils/validateMongodbId");

const jwt = require('jsonwebtoken');

const addtoCart = asyncHandler(async (req) => {
    const { productId, quantity } = req.body;

    const userId = req.user._id; //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ userId });
      let product = await Product.findById(productId)
      
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = productItem.quantity + quantity;
          productItem.totalPriceItem = product.price * productItem.quantity;
          cart.products[itemIndex] = productItem;
        } else {
            totalPriceItem = product.price * quantity;
            //product does not exists in cart, add new item
            cart.products.push({ productId, quantity, totalPriceItem});
        }
        let cartTotal = 0;
        for (let i = 0; i < cart.products.length; i++) {
          cartTotal = cartTotal + cart.products[i].totalPriceItem;
        }
        cart.cartTotal = cartTotal;
        cart = await cart.save();
        return cart;
      } else {
        totalPriceItem = product.price * quantity;
        cartTotal = totalPriceItem;
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, totalPriceItem}],
          cartTotal,
        });
        return newCart;
      }
    } catch (err) {
        throw new Error(err);
    }
});

const getCart = asyncHandler(async (req) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const cart = await Cart.findOne({ userId: _id }).populate({path: "products.productId", select:'name shortDescription images price'});
      return cart;
    } catch (error) {
      throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req) => {
    const { _id } = req.user;
    try {
      const findCart = await Cart.findOne({userId: _id});
      if(findCart)
      {
        const data = await Cart.findOneAndRemove({ userId: _id });
        return data
      }
    } catch (error) {
      throw new Error(error);
  }
});

const updateCart = asyncHandler(async (req) => {
  const { update, productId } = req.body;
  const userId = req.user._id; //TODO: the logged in user id
  try {
    let cart = await Cart.findOne({ userId });
    let getProduct = await Product.findById(productId)

    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
      if(itemIndex > -1)
      {
        if(update == "delete")
        {
          cart.cartTotal = cart.cartTotal - cart.products[itemIndex].totalPriceItem;
          cart.products.splice(itemIndex,1);
          // cart = await cart.save();
          if(cart.products.length == 0)
          {
            await Cart.findOneAndRemove({ userId });
          }
        }
        
        if(update == "plus")
        {
          if((cart.products[itemIndex].quantity + 1) <= getProduct.quantity)
          {
            cart.cartTotal = cart.cartTotal + getProduct.price;
            cart.products[itemIndex].quantity = cart.products[itemIndex].quantity + 1;
            cart.products[itemIndex].totalPriceItem = getProduct.price * cart.products[itemIndex].quantity;
            // cart = await cart.save();
          }
          else {
            throw new Error("Số lượng không khả dụng")
          }
        }

        if(update == "minus")
        {
          if((cart.products[itemIndex].quantity - 1) > 0)
          {
            cart.cartTotal = cart.cartTotal + getProduct.price;
            cart.products[itemIndex].quantity = cart.products[itemIndex].quantity - 1;
            cart.products[itemIndex].totalPriceItem = getProduct.price * cart.products[itemIndex].quantity;
            cart = await cart.save();
          }
          else {
            cart.cartTotal = cart.cartTotal - cart.products[itemIndex].totalPriceItem;
            cart.products.splice(itemIndex,1);
            // cart = await cart.save();
            if(cart.products.length == 0)
            {
              await Cart.findOneAndRemove({ userId });
            }
          }
        }

        cart = await cart.save();
        const getCart = await Cart.findOne({ userId }).populate({path: "products.productId", select:'name shortDescription images price'});
        return getCart;
      }
      else {
        throw new Error("Không tìm thấy sản phẩm trong giỏ hàng")
      }
    }
    else {
      throw new Error("Cart null");
    }
  } catch (err) {
      throw new Error(err);
  }
});

const removeProductInCart = asyncHandler(async (req) => {
    const { productId } = req.body;
    const userId = req.user._id; //TODO: the logged in user id
    try {
      let cart = await Cart.findOne({ userId });
      if (cart) {
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
          cart.cartTotal = cart.cartTotal - cart.products[itemIndex].totalPriceItem;
          cart.products.splice(itemIndex,1);
          cart = await cart.save();
          if(cart.products.length == 0)
          {
            await Cart.findOneAndRemove({ userId });
          }
          const getCart = await Cart.findOne({ userId }).populate({path: "products.productId", select:'name shortDescription images price'});
          return getCart;
        }
        else {
          throw new Error("fail")
        }
      }
      else {
        throw new Error("fail");
      }
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {addtoCart, getCart, emptyCart, updateCart, removeProductInCart};