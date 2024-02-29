import axios from 'axios'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'

const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_SERVER_API_SERVICE,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    const user = session?.user as Session['user']
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${user.accessToken}`
    }

    return config
  },
  (err) => Promise.reject(err)
)

export default axiosPrivate
