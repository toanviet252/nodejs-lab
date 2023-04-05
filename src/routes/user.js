import express from "express";
import { body } from "express-validator";
import { createBooking, getAllBookings } from "../controllers/user";
import moment from "moment";
const router = express.Router();

router.get("/:userId/bookings", getAllBookings);
// router.get("/bookings/:bookingId", getBooking);
router.post(
  "/bookings",
  [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("fullname").notEmpty().trim().isString(),
    body("user").notEmpty().isString(),
    body("phoneNumber").notEmpty().trim().isString(),
    body("price").notEmpty().isFloat(),
    body("rooms").notEmpty().isArray(),
    body("identityCardNumber").notEmpty().isString(),
    body(["dateOrder.startDate", "dateOrder.endDate"])
      .notEmpty()
      .custom((value, { req }) => {
        const dateObj = moment(value, moment.ISO_8601, true).toDate();
        if (isNaN(dateObj.getTime())) {
          throw new Error("Invalid date format");
        }
        return true;
      }),
  ],
  createBooking
);

export default router;
