import { createError, errorHandler } from "../helpers/errorHandler";
import userModel from "../models/user";
import productModel from "../models/product";
import orderModel from "../models/order";
import validateRequest from "../helpers/vaidateRequest";
import { transporter } from "../utils/mailer";
// import fs from "fs";
import ejs from "ejs";
import queryString from "querystring";
import chatroomModel from "../models/chatroom";
import sessionModel from "../models/session";
import { getIO } from "../utils/socket";

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

    // check the quantiy of product > count?
    if (count > product.count)
      return createError("There are not enough products in store", 400);
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

    const product = await productModel.findById(idProduct);
    if (!product) return createError("Not found product", 404);
    console.log("count", count, "prd count", product.count);
    if (count > product.count)
      return createError("There are not enough products in store", 400);

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
/* eslint-disable no-unused-vars */
export const checkout = async (req, res, next) => {
  const checkoutData = req.body;
  try {
    validateRequest(req);
    const { userOrder, products, orderInfor } = checkoutData;
    // console.log(products);
    const user = await userModel.findById(userOrder);
    if (!user) return createError("Not found user", 404);

    // check amount of product
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const id = element.product._id;
      const count = element.quantity;
      const product = await productModel.findById(id);
      if (!product) return createError(`Not fount product ${id}`, 404);
      if (count > product.count)
        return createError("There are not enough products in store", 400);
      // decrease count of product
      product.count = product.count - count;
      product.save();
    }
    // console.log(object);

    const newOrder = new orderModel({
      ...checkoutData,
      status: "Waiting for pay",
    });
    await newOrder.save();
    // add order to user's order and remove all product in user's cart
    user.orders.push(newOrder._id);
    user.cart = [];
    await user.save();

    const tempalte = await ejs.renderFile("./src/templates/mail.ejs", {
      orderInfor,
      username: user.fullName,
      totalPrice: checkoutData.totalPrice.toLocaleString(),
      products,
    });

    // đính kèm file hoặc ảnh trong email
    // const attachments = products.map((item) => ({
    //   filename: `${item.product.name}.jpeg`,
    //   path: item.product.photos[0],
    //   cid: item.product.photos[0],
    // }));
    // console.log(tempalte);
    // console.log(attachments);

    // send Email
    await transporter.sendMail({
      from: "toankvfx17375@funix.edu.vn",
      to: user.email,
      subject: "Bạn đã đặt một đơn hàng",
      html: tempalte,
      // attachments,
    });

    return res.status(200).json({
      message: "Order success.",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllOrderHistory = async (req, res, next) => {
  const { idUser } = req.query;
  try {
    const allOrderList = await orderModel.find({ userOrder: idUser });
    if (!allOrderList) return createError("Not found any order", 404);
    return res.status(200).json({
      message: "OK",
      data: allOrderList,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params?.orderId;
    if (!orderId) return createError("Not found order ID", 400);
    const order = await orderModel
      .findById(orderId)
      .populate("products.product");
    if (!order) return createError("Not found order", 404);
    return res.status(200).json({
      data: order,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getSessionMessages = async (req, res, next) => {
  try {
    const roomId = req.query.roomId;
    // console.log(roomId);
    const roomData = await chatroomModel.findById(roomId);
    if (!roomData) return createError("Not found chatroom", 404);
    return res.status(200).json({ message: "OK", data: roomData });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const createNewChatroom = async (req, res, next) => {
  try {
    // console.log(req.session);
    // const userId = req.query.userId;
    const query = req.url.split("?")[1];
    const params = queryString.parse(query);
    const { userId } = params;
    console.log(userId);
    const user = await userModel.findById(userId);
    if (!user) createError("Not found user", 404);
    // Tạo phòng chat mới
    const newChatroom = new chatroomModel({
      user: user._id,
      messages: [],
    });
    await newChatroom.save();
    // Cập nhật lại chatroom trong sesion
    const sessionDoc = await sessionModel.findOne({ "session.userId": userId });
    if (!sessionDoc) return createError("Not found sessionDoc", 404);
    sessionDoc.session.chatroom = newChatroom._id;
    await sessionDoc.save();

    return res.status(200).json({
      data: newChatroom._id,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const postMessage = async (req, res, next) => {
  try {
    const { message, roomId, is_admin, userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return createError("Not found user", 404);
    const chatroomDoc = await chatroomModel.findById(roomId);
    if (!roomId) return createError("Not found roomId", 404);
    const newMess = {
      message,
      sender: {
        role: user.role,
        _id: user._id,
      },
    };
    chatroomDoc.messages.push(newMess);
    await chatroomDoc.save();

    const io = getIO();
    io.emit("posts", { action: "post_mesage", newMess });

    return res.status(200).json({
      message: "OK",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
