import axios from 'axios';
import { getToken } from './auth';

const apiInstance = axios.create({
  baseURL: window.appConfig.apiEndPoint,
});
apiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
  }
  return config;
});

export default apiInstance;
