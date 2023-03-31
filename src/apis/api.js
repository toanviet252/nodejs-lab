import apiInstance from "../utils/axios";

export const getAllHotels = async () => {
  let response;
  try {
    const res = await apiInstance.get("/");
    response = res;
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const searchHotels = async (params) => {
  return await apiInstance.get("/search", { params });
};

export const getHotelData = async (id) => {
  return await apiInstance.get(`/hotels/${id}`);
};

// booking
export const createBooking = async (body) => {
  return await apiInstance.post("/bookings", body);
};
export const getAllBookings = async (userId) => {
  console.log(userId);
  return await apiInstance.get(`/${userId}/bookings`);
};
