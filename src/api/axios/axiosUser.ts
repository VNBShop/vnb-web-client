import axios from 'axios'

export const axiosUser = axios.create({
  baseURL: `${process.env.NEXT_SERVER_API_SERVICE}/user-service/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
})
