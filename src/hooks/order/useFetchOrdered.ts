import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { ORDER_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Ordered, OrderedStatus } from '../../../types/order'

export type OrderedFilter = {
  status: OrderedStatus
}

type IProps = {
  filter: OrderedFilter
}
export default function useFetchOrdered({ filter }: IProps) {
  const axios = useAxiosPrivate()
  const {
    data,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['products', filter],
    queryFn: async ({ pageParam: currentPage, queryKey }) => {
      const filter = queryKey[1] as OrderedFilter
      const res: DataResponse = await axios.get(
        `${ORDER_SERVICE}/orders/user`,
        {
          params: {
            currentPage,
            pageSize: 10,
            ...filter,
          },
        }
      )

      if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
        return res?.data?.metadata?.data
      } else {
        throw new Error('')
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages?.length + 1,
    refetchOnWindowFocus: false,
  })

  return {
    data: data?.pages ?? [],
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  }
}
