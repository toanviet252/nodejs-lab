import express from "express";
import { getAllProducts } from "../controllers/shop";
const router = express.Router();

router.get("/products", getAllProducts);

export default router;
