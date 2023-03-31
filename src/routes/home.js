import express from "express";
import {
  getAllHotels,
  getHotel,
  getHotelsWithParams,
} from "../controllers/home";
const router = express.Router();

router.get("/", getAllHotels);

router.get("/search", getHotelsWithParams);

router.get("/hotels/:hotelId", getHotel);

export default router;
