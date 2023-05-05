import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllOrders,
  getAllProducts,
  getDashboarData,
  getOrder,
  getProduct,
  updateProduct,
} from "../controllers/admin";
import { isAuth } from "../middlewares/isAuth";
import { isAdmin } from "../middlewares/checkRole";

const router = express.Router();

// dashboard
router.get("/dashboard", isAuth, isAdmin, getDashboarData);

// product
router.get("/products", isAuth, isAdmin, getAllProducts);
router.get("/products/:productId", isAuth, isAdmin, getProduct);
router.post("/products", isAuth, isAdmin, createProduct);
router.patch("/products/:productId", isAuth, isAdmin, updateProduct);
router.delete("/products/:productId", isAuth, isAdmin, deleteProduct);

// order
router.get("/orders", isAuth, isAdmin, getAllOrders);
router.get("/orders/:orderId", isAuth, isAdmin, getOrder);

export default router;
