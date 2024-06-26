'use client'

import { useEffect } from 'react'

import axios from 'axios'
import { Session } from 'next-auth'
import { getSession, signOut, useSession } from 'next-auth/react'

import axiosPrivate from '../axios'

export default function useAxiosPrivate() {
  const { data: session, update } = useSession()

  useEffect(() => {
    if (!session) return

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err?.code === 'ERR_NETWORK') {
          await signOut()
        }

        const prevReq = err.config
        if (err?.response?.status === 401 && !prevReq?.sent) {
          try {
            const response = await axios.post(
              `${process.env.NEXT_SERVER_API_SERVICE}/user-service/api/v1/account/refresh-token`,
              {
                refreshToken: session?.user?.refreshToken,
              }
            )

            if (response?.data?.success && !!update && !!session) {
              await update({
                ...session,
                user: {
                  ...session.user,
                  accessToken: response?.data?.metadata?.accessToken,
                  refreshToken: response?.data?.metadata?.refreshToken,
                },
              })
            }
          } catch (error: any) {
            if (error?.response?.status) await signOut()
          }

          // if (!isRefreshing) {
          //   isRefreshing = true
          // await refreshToken.mutate()
          //   isRefreshing = false
          // }
          prevReq.sent = true

          const response = await getSession()
          const user = response?.user as Session['user']

          prevReq.headers['Authorization'] = `Bearer ${user.accessToken}`

          return axiosPrivate(prevReq)
        }
        return Promise.reject(err)
      }
    )

    return () => {
      // axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(session ?? {})])

  return axiosPrivate
}
