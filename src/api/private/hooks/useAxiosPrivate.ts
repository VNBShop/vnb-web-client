'use client'

import { useEffect } from 'react'

import { AxiosRequestConfig } from 'axios'
import { useSession } from 'next-auth/react'

import { axiosPrivate } from '../axios'

export default function useAxiosPrivate() {
  const { data: session } = useSession()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`
      }

      return config
    })

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
    }
  }, [session])

  return axiosPrivate
}
