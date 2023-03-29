import hotelModel from "../models/hotel";
import roomModel from "../models/room";
import { createError, errorHandler } from "../utils/errorhandler";

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find().sort({ rating: -1 });
    return res.status(200).json({
      message: "OK",
      hotels,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

// For search
export const getHotelsWithParams = async (req, res, next) => {
  const { destination, date, options } = req.query;
  console.log(options);
  try {
    if (!destination && !date && !options)
      return createError("Bad request", 400);
    const queryDestionation = destination
      .trim()
      .toLowerCase()
      .split(" ")
      .join("");
    // console.log(queryDestionation);
    const hotels = await hotelModel
      .find({
        city: { $regex: new RegExp(queryDestionation, "i") }, //i flag ko phân biệt chữ hoa và chữ  thường
      })
      .populate("rooms");

    if (!hotels.length > 0) return createError("Not found any hotels", 404);

    // check xem phòng của khách sạn có phù hợp với số người khách chọn ko
    const result = hotels.filter((hotel) => {
      // chỉ cần khách sạn chứa 1 phòng thoả mãn yêu cầu
      return hotel.rooms.some((room) => {
        console.log(+room.maxPeople >= +options.room);
        return +room.maxPeople >= +options.room;
      });
    });
    return res.status(200).json({
      message: "OK",
      hotels: result,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
