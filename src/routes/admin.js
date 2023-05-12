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
import { body } from "express-validator";

const router = express.Router();

// dashboard
router.get("/dashboard", isAuth, isAdmin, getDashboarData);

// product
router.get("/products", isAuth, isAdmin, getAllProducts);
router.get("/products/:productId", isAuth, isAdmin, getProduct);
router.post(
  "/products",
  isAuth,
  isAdmin,
  [
    body(["name", "category", "short_desc", "long_desc"])
      .notEmpty()
      .isString()
      .isLength({
        min: 3,
      })
      .withMessage("Value must be equal or more than 3 characters"),
    body("count")
      .notEmpty()
      .toInt()
      .custom((value) => {
        if (value <= 0) throw new Error("Quantity must be greater than 0");
        return true;
      }),
    body("price")
      .notEmpty()
      .custom((value) => {
        const data = +value.replaceAll(",", "");
        if (typeof data !== "number" || data < 0)
          throw new Error("Price is not a valid number");
        return true;
      }),
  ],
  createProduct
);
router.patch(
  "/products/:productId",
  isAuth,
  isAdmin,
  [
    body(["name", "category", "short_desc", "long_desc"])
      .notEmpty()
      .isString()
      .isLength({
        min: 3,
      })
      .withMessage("Value must be equal or more than 3 characters"),
    body("count")
      .notEmpty()
      .toInt()
      .custom((value) => {
        if (value <= 0) throw new Error("Quantity must be greater than 0");
        return true;
      }),
    body("price")
      .notEmpty()
      .custom((value) => {
        const data = +value.replaceAll(",", "");
        if (typeof data !== "number" || data < 0)
          throw new Error("Price is not a valid number");
        return true;
      }),
  ],
  updateProduct
);
router.delete("/products/:productId", isAuth, isAdmin, deleteProduct);

// order
router.get("/orders", isAuth, isAdmin, getAllOrders);
router.get("/orders/:orderId", isAuth, isAdmin, getOrder);

export default router;
