import apiInstance from "../utils/axios";
import { Modal, message } from "antd";

export const getAllHotels = async () => {
  let response;
  try {
    const res = await apiInstance.get("/");
    response = res;
  } catch (err) {
    throw new Error(err);
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
  return await apiInstance.get(`/${userId}/bookings`);
};

// admin
export const getDashboarData = async () => {
  return await apiInstance.get("/admin/dashboard");
};

export const getAllAdminHotels = async () => {
  return await apiInstance.get("/admin/hotels");
};
export const addHotel = async (body) => {
  return await apiInstance.post("/admin/hotels", body);
};
export const deleteHotel = async (id) => {
  return await apiInstance.delete(`/admin/hotels/${id}`);
};
export const updateHotel = async (id, body) => {
  return await apiInstance.patch(`/admin/hotels/${id}`, body);
};

export const getAllUsers = async () => {
  return await apiInstance.get("admin/users");
};
export const getAllTransactions = async () => {
  return await apiInstance.get("admin/transactions");
};
// Room
export const getAllRooms = async (params) => {
  return await apiInstance.get("admin/rooms", { params });
};
export const addRoom = async (body) => {
  return apiInstance.post("/admin/rooms", body);
};
export const updateRoom = async (id, body) => {
  return apiInstance.patch(`/admin/rooms/${id}`, body);
};
export const deleteRoom = async (id) => {
  return apiInstance.delete(`/admin/rooms/${id}`);
};

export const deleteAPI = (id, deleteFunction, fetchFunction) => {
  Modal.confirm({
    title: "Are you sure to delete?",
    onOk: async () => {
      let res;
      try {
        res = await deleteFunction(id);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(res.data?.message);
        }
        await fetchFunction();
        message.success("Deleted");
      } catch (err) {
        console.log(err);
        message.error(err.response?.data?.message || err.message);
      }
    },
  });
};
