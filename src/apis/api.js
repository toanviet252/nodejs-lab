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
