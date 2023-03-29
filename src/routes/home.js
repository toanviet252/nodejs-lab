import express from "express";
import { getAllHotels, getHotelsWithParams } from "../controllers/home";
const router = express.Router();

router.get("/", getAllHotels);

router.get("/search", getHotelsWithParams);

export default router;
