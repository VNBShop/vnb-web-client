import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'

export default function useFetchPosts() {
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
    queryKey: ['get-posts'],
    queryFn: async ({ pageParam: currentPage, queryKey }) => {
      const res: DataResponse = await axios.get(`${FORUM_SERVICE}/posts`, {
        params: {
          currentPage,
          pageSize: 10,
        },
      })

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
