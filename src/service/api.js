import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 5000,
});

export const validateWord = (word) => api.get('/validate', { params: { word } })