import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'

export type TopUsers = {
  userId: number
  fullName: string
  avatar: string
  totalPosts: number
}

export default function useFetchTopUsers() {
  const axios = useAxiosPrivate()

  const { data, isPending } = useQuery({
    queryKey: ['get-top-users'],
    queryFn: async () => {
      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/posts/top-users`
      )

      if (res?.data?.success) {
        return res?.data?.metadata ?? []
      } else {
        throw new Error('Cant not fetch top users!')
      }
    },
  })

  return {
    topUsers: data as TopUsers[],
    loading: isPending,
  }
}
