import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { USER_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { User } from '../../../types/user'

export default function useFetchUser() {
  const axios = useAxiosPrivate()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: async () => {
      const res: DataResponse = await axios.get(`${USER_SERVICE}/users/profile`)
      if (res?.data?.success) {
        return res?.data?.metadata as User
      } else {
        throw new Error('Cant not fetch user information')
      }
    },
    refetchOnWindowFocus: false,
  })
  return {
    data,
    isFetching,
    isLoading,
  }
}
