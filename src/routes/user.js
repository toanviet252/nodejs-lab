import express from "express";
import {
  checkout,
  deleteCartProduct,
  getCartData,
  postProductToCart,
  updateCartProduct,
} from "../controllers/user";
import { isAuth } from "../middlewares/isAuth";
import { body } from "express-validator";

const router = express.Router();

router.get("/carts", isAuth, getCartData);

router.post("/carts/add", isAuth, postProductToCart);

router.patch("/carts/update", isAuth, updateCartProduct);

router.delete("/carts/delete", isAuth, deleteCartProduct);

router.post(
  "/checkout",
  [
    body("products")
      .isArray({ min: 1 })
      .custom((products) => {
        for (let i = 0; i < products.length; i++) {
          const item = products[i];
          if (typeof item.product !== "string")
            throw new Error("productId must be a string");
          if (!Number.isInteger(item.quantity) || item.quantity < 0)
            throw new Error(
              "Quantity must be an integer number and greater than 0"
            );
          break;
        }
        return true;
      }),
    body("userOrder").notEmpty().isString(),
    body("totalPrice").isInt(),
    body([
      "orderInfor.fullname",
      "orderInfor.phoneNumber",
      "orderInfor.address",
    ])
      .notEmpty()
      .trim()
      .isString(),
    body("orderInfor.email").notEmpty().isEmail().normalizeEmail(),
  ],
  isAuth,
  checkout
);

export default router;
