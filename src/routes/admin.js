import express from "express";
import {
  getAllRooms,
  getAllTransactions,
  getAllUsers,
  getLastestTransaction,
  createHotel,
  deleteHotel,
  updateHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  getAllHotels,
} from "../controllers/admin";
import isAuth from "../middlewares/isAuth";
import { body } from "express-validator";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.get("/dashboard", isAuth, isAdmin, getLastestTransaction);

// Hotel
router.get("/hotels", isAuth, isAdmin, getAllHotels);
router.post(
  "/hotels",
  isAuth,
  isAdmin,
  [
    body(["name", "city", "desc", "type", "address", "title", "cheapestPrice"])
      .notEmpty()
      .isString()
      .trim(),
    body("featured").notEmpty().isBoolean(),
    body("photos")
      .isArray()
      .notEmpty()
      .custom((value) => {
        for (let i = 0; i < value.length; i++) {
          if (!/^https?:\/\//i.test(value[i])) {
            throw new Error("Each item in the array must be a URL");
          }
        }
        return true;
      }),
    body("rooms").isArray(),
  ],
  createHotel
);
router.patch(
  "/hotels/:hotelId",
  isAuth,
  isAdmin,
  [
    body(["name", "city", "desc", "type", "address", "title", "cheapestPrice"])
      .notEmpty()
      .isString(),
    body("featured").notEmpty().isBoolean(),
    body("photos")
      .isArray()
      .notEmpty()
      .custom((value) => {
        for (let i = 0; i < value.length; i++) {
          if (!/^https?:\/\//i.test(value[i])) {
            throw new Error("Each item in the array must be a URL");
          }
        }
        return true;
      }),
    body("rooms").isArray(),
  ],
  updateHotel
);
router.delete("/hotels/:hotelId", isAuth, isAdmin, deleteHotel);

// Room
router.get("/rooms", isAuth, isAdmin, getAllRooms);

router.post(
  "/rooms",
  isAuth,
  isAdmin,
  [
    body(["title", "desc", "hotel"]).notEmpty().isString(),
    body(["price", "maxPeople"])
      .toFloat()
      .isFloat()
      .custom((value) => {
        if (value < 1) {
          throw new Error("Value must be greater or equal to 1");
        }
        return true;
      }),
  ],
  createRoom
);
router.patch(
  "/rooms/:roomId",
  isAuth,
  isAdmin,
  [
    body(["title", "desc", "hotel"]).notEmpty().isString(),
    body(["price", "maxPeople"])
      .toFloat()
      .isFloat()
      .custom((value) => {
        if (value < 1) {
          throw new Error("Value must be greater or equal to 1");
        }
        return true;
      }),
  ],
  updateRoom
);
router.delete("/rooms/:roomId", isAuth, isAdmin, deleteRoom);

router.get("/users", isAuth, isAdmin, getAllUsers);

router.get("/transactions", isAuth, isAdmin, getAllTransactions);

export default router;
