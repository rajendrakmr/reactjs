import axios from 'axios';
import { clearCookie, getCookie } from './cookieService';
const BaseUrl = process.env.REACT_APP_API_DPL_URL; 
const instance = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
}); 
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token'); 
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) { 
        clearCookie()
        window.location.href = '/?session=expired';
      } else {
        console.error(`Unexpected error code ${error.response.status}:`, error.response.data);
      }
    } 
 
    return Promise.reject(error);
  }
);


export default instance;