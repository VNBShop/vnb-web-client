import { useSession } from 'next-auth/react'

import { axiosPrivate } from '../axios'

export const useRefreshToken = () => {
  const { data: session } = useSession()

  const refreshToken = async () => {
    const res = await axiosPrivate.post(
      '/user-service/api/v1/account/refresh-token',
      {
        refreshToken: session?.user?.refreshToken,
      }
    )

    if (res?.data?.success && session) {
      session.user.accessToken = res?.data?.metadata?.accessToken
      session.user.refreshToken = res?.data?.metadata?.refreshToken
    }
  }

  return refreshToken
}
