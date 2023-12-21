import axios from 'axios'

export const axiosProduct = axios.create({
  baseURL: process.env.NEXT_PRODUCT_SERVICE,
  headers: {
    Accept: 'application/json',
  },
})
