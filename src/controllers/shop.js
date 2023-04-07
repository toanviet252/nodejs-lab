// import mongoose from "mongoose";
import { errorHandler } from "../helpers/errorHandler";
import productModel from "../models/product";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    return res.status(200).json({
      message: "OK",
      data: products,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
