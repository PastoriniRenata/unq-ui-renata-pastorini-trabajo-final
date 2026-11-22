import axios from 'axios'

const api = axios.create({
  baseURL: 'https://word-api-hmlg.vercel.app/api',
})

export const validateWord = (word) => api.get('/validate', { params: { word } })