import axios from 'axios';
import { getAccessTokenAuth0 } from '../config/auth0';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
  const tokenResult = await getAccessTokenAuth0();
  
  if (tokenResult.isOk()) {
    config.headers.Authorization = `Bearer ${tokenResult.value}`;
  } else {
    console.error(tokenResult.error.message);
  }
  
  return config;
});

api.interceptors.response.use(
    response => response.data,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Token expired or invalid');
        }
        return Promise.reject(error); 
    }
)

export default api;