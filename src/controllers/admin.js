import { errorHandler, createError } from "../utils/errorhandler";
import transactionModel from "../models/transaction";
import userModel from "../models/user";
import roomModel from "../models/room";
import hotelModel from "../models/hotel";
import validatorRequest from "../utils/validator";
import mongoose from "mongoose";

export const getLastestTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionModel
      .find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate({ path: "user", select: "fullName" })
      .populate({ path: "hotel", select: "name" })
      .populate({ path: "rooms.id" });
    //Count document
    const totalUsers = await userModel.find().count();
    const totalOrders = await transactionModel.find().count();
    const Orders = await transactionModel.find();
    const totalEarning = Orders.map((order) => order.price).reduce(
      (acc, cur) => acc + cur,
      0
    );
    return res.status(200).json({
      data: {
        lastestTransactions: transaction,
        earning: totalEarning,
        user: totalUsers,
        order: totalOrders,
        balance: totalEarning,
      },
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: users,
      message: "OK",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: hotels,
      message: "OK",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const createHotel = async (req, res, next) => {
  try {
    validatorRequest(req);
    const { rooms } = req.body;
    for (let i = 0; i < rooms.length; i++) {
      const existRooms = await roomModel.findById(rooms[i]);
      if (!existRooms)
        return createError(`Not found rooms with id: ${rooms[i]}`);
      break;
    }
    const data = req.body;
    const city = data.city.replaceAll(" ", "");
    const hotel = new hotelModel({ ...data, rating: 0, city });
    await hotel.save();
    return res.status(201).json({
      message: "Created",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
export const updateHotel = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    if (!hotelId) return createError("Hotel ID is requried!", 400);
    validatorRequest(req);
    const updateData = req.body;
    await hotelModel.findByIdAndUpdate(hotelId, updateData);
    return res.status(200).json({
      message: "Updated",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const exist = await hotelModel.findById(hotelId);
    if (!exist) return createError("Not found any hotel", 404);
    // kiểm tra khách sạn có đang được đặt hay ko
    const orderHotel = await transactionModel.findOne({ hotel: hotelId });
    if (orderHotel && orderHotel.status === "Booked") {
      return createError("Hotel is already booked. Cannot delete!", 403);
    }
    const deleteHotel = await hotelModel.findByIdAndDelete(hotelId);
    // Xóa các room related với hotel
    const deleteArrayRooms = deleteHotel.rooms;
    for (let i = 0; i < deleteArrayRooms.length; i++) {
      const findRoom = roomModel.findById(deleteArrayRooms[i]);
      if (!findRoom)
        return createError(
          `Not found room with id ${deleteArrayRooms[i]} to delete`,
          404
        );
      await roomModel.findByIdAndDelete(deleteArrayRooms[i]);
    }

    return res.status(200).json({
      message: "deleted!",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionModel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "hotel", selsect: "name" })
      .populate({ path: "user", selsect: "fullName" })
      .populate({ path: "rooms.id", selsect: "name" });
    return res.status(200).json({
      message: "OK",
      data: transactions,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

// Room controller
export const getAllRooms = async (req, res, next) => {
  const hotelId = req.query.hotelId;
  let rooms;
  try {
    if (hotelId) {
      rooms = await roomModel.find({ hotel: hotelId }).sort({ createdAt: -1 });
    } else {
      rooms = await roomModel.find().sort({ createdAt: -1 });
    }
    return res.status(200).json({
      data: rooms,
      message: "OK",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const createRoom = async (req, res, next) => {
  try {
    validatorRequest(req);
    const data = req.body;
    const { hotel } = data;
    const newRoom = new roomModel(data);
    // Add room to related hotel
    const queryHotel = await hotelModel.findById(hotel);
    if (!queryHotel) return createError("Not found hotel match with ID", 404);
    queryHotel.rooms.push(newRoom);
    await newRoom.save();
    await queryHotel.save();

    return res.status(200).json({
      message: "Created",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
export const updateRoom = async (req, res, next) => {
  const updateData = req.body;
  const roomId = req.params.roomId;
  const hotelId = updateData.hotel;
  // console.log("request ID", roomId, hotelId);
  try {
    validatorRequest(req);
    const room = await roomModel.findById(roomId);
    if (!room) return createError("Not found any room", 404);
    await roomModel.updateOne({ _id: roomId }, updateData);

    // Update related hotel if change the hotel record
    const originalHotelId = room.hotel;
    if (originalHotelId.toString() !== hotelId) {
      //Pull the room from previous hotel
      await hotelModel.findByIdAndUpdate(
        originalHotelId,
        { $pull: { rooms: roomId } },
        { new: true }
      );
      //Push the room to new hotel
      await hotelModel.findByIdAndUpdate(
        hotelId,
        { $push: { rooms: roomId } },
        { new: true }
      );
    }
    return res.status(200).json({
      message: "Updated",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  let session = null;

  try {
    if (!roomId) return createError("ID is required", 400);
    session = await mongoose.startSession();
    session.startTransaction();
    const room = await roomModel.findById(roomId).session(session);
    if (!room) {
      await session.abortTransaction();
      session.endSession();
      return createError("Not found any room", 404);
    }
    // check if room is booking or not
    const orderRoom = await transactionModel.findOne({
      rooms: { $elemMatch: { id: roomId } },
    });
    // console.log(orderRoom);
    if (orderRoom && orderRoom.status === "Booked") {
      const err = new Error("Room is already booked. Cannot delete!");
      err.statusCode = 403;
      throw err;
    }

    const deleteRoom = await roomModel
      .findByIdAndDelete(roomId)
      .session(session);
    // delete room in hotel model
    await hotelModel.findOneAndUpdate(
      { _id: deleteRoom.hotel },
      { $pull: { rooms: roomId } },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
      message: "Deleted",
    });
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    next(errorHandler(err));
  }
};
