import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { ORDER_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Cart } from '../../../types/order'

export default function useFetchCart() {
  const axios = useAxiosPrivate()
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['get-user-cart'],
    queryFn: async () => {
      return (await axios.get(`${ORDER_SERVICE}/carts`)) as DataResponse
    },
    refetchOnWindowFocus: false,
  })

  return {
    isFetching,
    isLoading,
    refetch,
    data: (data?.data?.metadata as Cart[]) ?? [],
  }
}
