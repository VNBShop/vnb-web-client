import axios from 'axios'

export const axiosStore = axios.create({
  baseURL: `${process.env.NEXT_SERVER_API_SERVICE}/store-service/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
})
