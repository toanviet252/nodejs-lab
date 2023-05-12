import { errorHandler, createError } from "../helpers/errorHandler";
import validateRequest from "../helpers/vaidateRequest";
import productModel from "../models/product";
import userModel from "../models/user";
import orderModel from "../models/order";
import { revertNumber } from "../helpers/revertNumber";

export const getDashboarData = async (req, res, next) => {
  try {
    const users = await userModel.find();
    const orders = await orderModel.find().sort({ createdAt: -1 });
    const totalEarning = orders
      .map((item) => item.totalPrice)
      .reduce((acc, cur) => acc + cur, 0);
    return res.status(200).json({
      data: {
        users,
        orders,
        totalEarning,
      },
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const query = req.query?.name;
    let products;
    if (!query) {
      products = await productModel.find();
    } else {
      products = await productModel.find({
        name: { $regex: new RegExp(query, "i") },
      });
    }
    return res.status(200).json({
      message: "OK",
      data: products,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    if (!productId) return createError("Product ID is required", 400);
    const product = await productModel.findById(productId);
    if (!product) return createError("Not found any product", 404);
    return res.status(200).json({
      data: product,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    validateRequest(req);
    const productData = req.body;
    const price = +productData.price.replaceAll(",", "");
    const photos = req.files;
    const imgPath = photos.map((item) => item.path);
    productData.photos = imgPath;

    const newProduct = new productModel({ ...productData, price });
    await newProduct.save();
    return res.status(201).json({
      message: "Product created",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    validateRequest(req);
    const receivceData = req.body;
    const price = revertNumber(receivceData.price);
    console.log(typeof price, price);
    const productId = req.params.productId;
    const updateData = { ...receivceData, price };

    const product = await productModel.findById(productId);

    if (!product) return createError("Not found product", 404);

    await productModel.updateOne({ _id: productId }, updateData);

    return res.status(201).json({
      message: "Updated",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    if (!productId) return createError("Product ID is required", 400);
    await productModel.findByIdAndDelete(productId);
    return res.status(201).json({
      message: "deleted",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

// Order
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: orders,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
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
