// import mongoose from "mongoose";

import { createError, errorHandler } from "../helpers/errorHandler";
import productModel from "../models/product";
import queryString from "querystring";
import userModel from "../models/user";

export const getAllProducts = async (req, res, next) => {
  let products;
  const query = req.url.split("?")[1];
  const params = queryString.parse(query);
  const { category, search } = params;
  try {
    if (category && category !== "all" && !search) {
      products = await productModel.find({ category });
    } else if (category && search && category !== "all") {
      products = await productModel.find({
        category: category,
        name: { $regex: new RegExp(search, "i") },
      });
    } else if (search && (!category || category === "all")) {
      products = await productModel.find({
        name: { $regex: new RegExp(search, "i") },
      });
    } else {
      products = await productModel.find();
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
  const productId = req.params.productId;
  try {
    const product = await productModel.findById(productId);
    if (!product) return createError("Not found any product", 404);
    return res.status(200).json({
      message: "OK",
      data: product,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
