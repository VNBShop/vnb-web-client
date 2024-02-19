import { useMutation } from '@tanstack/react-query'

import axios from 'axios'
import { useSession } from 'next-auth/react'

export const useRefreshToken = () => {
  const { data: session, update } = useSession()

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_SERVER_API_SERVICE}/user-service/api/v1/account/refresh-token`,
        {
          refreshToken: session?.user?.refreshToken,
        }
      )
      return response
    },
    onSuccess: (response) => {
      if (response?.data?.success && !!session) {
        update({
          ...session,
          user: {
            ...session.user,
            accessToken: response?.data?.metadata?.accessToken,
            refreshToken: response?.data?.metadata?.refreshToken,
          },
        })
      }
    },
  })

  return refreshMutation
}
