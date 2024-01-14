import axios from 'axios'

export const axiosProduct = axios.create({
  baseURL: `${process.env.NEXT_SERVER_API_SERVICE}/product-service/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
})
