'use client'

import { useEffect } from 'react'

import { AxiosRequestConfig } from 'axios'
import { useSession } from 'next-auth/react'

import { useRefreshToken } from './useRefreshToken'

import { axiosPrivate } from '../axios'

export default function useAxiosPrivate() {
  const { data: session } = useSession()
  const refreshToken = useRefreshToken()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `Bearer ${session?.user.accessToken}`
        }

        return config
      },
      (err) => Promise.reject(err)
    )

    let isRefreshing = false

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err.config
        if (err?.response?.status === 401 && !prevReq?.sent) {
          if (!isRefreshing) {
            isRefreshing = true
            await refreshToken()
            isRefreshing = false
          }
          prevReq.sent = true

          prevReq.headers[
            'Authorization'
          ] = `Bearer ${session?.user.accessToken}`
          return axiosPrivate(prevReq)
        }
        return Promise.reject(err)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [session])

  return axiosPrivate
}
