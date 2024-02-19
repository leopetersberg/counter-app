import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:80';

export const incrementCounter = async (userId) => {
  return await axios.post(`${API_URL}/api/counter/increment?user_id=${userId}`);
};

export const decrementCounter = async (userId) => {
  return await axios.post(`${API_URL}/api/counter/decrement?user_id=${userId}`);
};

export const resetCounter = async (userId) => {
  return await axios.post(`${API_URL}/api/counter/reset?user_id=${userId}`);
};

export const getCounter = async (userId) => {
  return await axios.get(`${API_URL}/api/counter?user_id=${userId}`);
};
