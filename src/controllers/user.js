import { errorHandler, createError } from "../utils/errorhandler";
import transactionModel from "../models/transaction";
import userModel from "../models/user";
import roomModel from "../models/room";
import validatorRequest from "../utils/validator";

export const getAllBookings = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    if (!userId) return createError("User ID is required", 400);
    const user = await userModel.findOne({ _id: userId });
    if (!user) return createError("Not found any user", 404);
    const allTransactions = await transactionModel
      .find({ user: userId })
      .populate({ path: "rooms.id" })
      .populate({ path: "hotel", select: "name" });
    return res.status(200).json({
      transactions: allTransactions,
      message: "OK",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const createBooking = async (req, res, next) => {
  try {
    validatorRequest(req);
    const {
      userId,
      hotel,
      price,
      paymentMethod,
      dateOrder,
      phoneNumber,
      identityCardNumber,
      rooms,
    } = req.body;
    const roomsData = rooms.map((room) => {
      return { id: room._id, quantity: room.quantity };
    });
    const transaction = new transactionModel({
      user: userId,
      hotel: hotel,
      price: price,
      dateStart: dateOrder.startDate,
      dateEnd: dateOrder.endDate,
      payment: paymentMethod,
      phoneNumber: phoneNumber,
      identityCardNumber: identityCardNumber,
      rooms: roomsData,
      status: "Booked",
    });
    await transaction.save();
    return res.status(200).json({
      message: "Order success!",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
