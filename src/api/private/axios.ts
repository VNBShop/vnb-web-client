import axios from 'axios'

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
