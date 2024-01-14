import axios from 'axios'

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_SERVER_API_SERVICE,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
})
