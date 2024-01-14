import { useSession } from 'next-auth/react'

import { axiosPrivate } from '../axios'

export const useRefreshToken = () => {
  const { data: session } = useSession()

  const refreshToken = async () => {
    const res = await axiosPrivate.post('/user-service/api/v1/refresh-token', {
      refreshToken: session?.user?.refreshToken,
    })

    console.log('res >>> ', res)
  }

  return refreshToken
}
