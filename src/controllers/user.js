import { createError, errorHandler } from "../helpers/errorHandler";
import userModel from "../models/user";
import productModel from "../models/product";
import orderModel from "../models/order";
import validateRequest from "../helpers/vaidateRequest";
import { transporter } from "../utils/mailer";
// import fs from "fs";
import ejs from "ejs";

export const getCartData = async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const user = await userModel
      .findById(idUser)
      .populate({ path: "cart.product" });
    if (!user) return createError("Not found user", 404);
    return res.status(200).json({
      message: "OK",
      data: user.cart,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const postProductToCart = async (req, res, next) => {
  const { count, idProduct, idUser } = req.query;
  try {
    if (!count || !idProduct || !idUser) return createError("Bad request", 400);
    const user = await userModel.findById(idUser);
    if (!user) return createError("Not found user", 404);
    const product = await productModel.findById(idProduct);
    if (!product) return createError("Not found product", 404);
    // Push product to cart's user
    const existProductIndex = user.cart.findIndex(
      (item) => item.product.toString() === idProduct
    );
    if (existProductIndex !== -1) {
      user.cart[existProductIndex].quantity += +count;
    } else {
      user.cart.push({ product: product._id, quantity: +count });
    }

    await user.save();
    return res.status(200).json({ message: "Add to cart success." });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const updateCartProduct = async (req, res, next) => {
  try {
    const { count, idProduct, idUser } = req.query;
    if (!count || !idProduct || !idUser) return createError("Bad request", 400);
    const user = await userModel.findById(idUser);

    if (!user) return createError("Not found user", 404);
    const updateProductIndex = user.cart.findIndex(
      (item) => item.product.toString() === idProduct
    );
    if (updateProductIndex === -1) {
      return createError("Product is not exist in cart", 404);
    } else {
      user.cart[updateProductIndex].quantity = count;
    }
    await user.save();
    return res.status(200).json({ message: "Updated" });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteCartProduct = async (req, res, next) => {
  const { idProduct, idUser } = req.query;
  if (!idProduct || !idUser) return createError("Bad request", 400);
  try {
    const user = await userModel.findById(idUser);
    if (!user) return createError("Not found user", 404);
    const deleteProductIndex = user.cart.findIndex(
      (item) => item.product.toString() === idProduct
    );
    if (deleteProductIndex === -1)
      return createError("Not found product in cart", 404);
    user.cart.splice(deleteProductIndex, 1);
    await user.save();
    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const checkout = async (req, res, next) => {
  const checkoutData = req.body;
  console.log(checkoutData);
  try {
    validateRequest(req);
    const { userOrder } = checkoutData;
    const user = await userModel.findById(userOrder);
    if (!user) return createError("Not found user", 404);
    const newOrder = new orderModel({ ...checkoutData, status: "Orderd" });
    await newOrder.save();
    // add order to user's order
    user.orders.push(newOrder._id);
    await user.save();

    const tempalte = await ejs.renderFile("./src/templates/mail.ejs", {
      orderInfor: checkoutData.orderInfor,
      username: user.fullName,
      totalPrice: checkoutData.totalPrice.toLocaleString(),
    });
    console.log(tempalte);

    // send Email
    transporter.sendMail({
      from: "toankvfx17375@funix.edu.vn",
      to: user.email,
      subject: "Bạn đã đặt một đơn hàng",
      html: tempalte,
    });

    return res.status(200).json({
      message: "Order success.",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
