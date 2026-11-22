import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

export const validateWord = (word) => api.get('/validate', { params: { word } })