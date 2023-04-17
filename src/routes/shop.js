import express from "express";
import { getAllProducts, getProduct } from "../controllers/shop";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:productId", getProduct);

export default router;
