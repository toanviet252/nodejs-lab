import apiInstance from '../utils/axios';

export const signUp = async (body) => {
  return apiInstance.post('/sign-up', body);
};

export const signIn = async (body) => {
  return apiInstance.post('/sign-in', body);
};
