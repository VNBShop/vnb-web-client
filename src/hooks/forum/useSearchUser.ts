import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { USER_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'

type IProps = {
  name: string
}

export type UserSearch = {
  userId: number
  fullName: string
  avatar: string
}

export default function useSearchUser({ name }: IProps) {
  const axios = useAxiosPrivate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search-user', name],
    queryFn: async ({ queryKey }) => {
      const res: DataResponse = await axios.get(
        `${USER_SERVICE}/users/forum-search-user`,
        {
          params: {
            name: queryKey[1],
          },
        }
      )

      if (res?.data?.success && !!res?.data?.metadata?.length) {
        return res?.data?.metadata as UserSearch[]
      } else {
        throw new Error('Cant not fetch user!')
      }
    },
    enabled: !!name,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return {
    users: data,
    loading: isLoading,
    isError,
  }
}
