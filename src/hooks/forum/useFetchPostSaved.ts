import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

export default function useFetchPostSaved() {
  const axios = useAxiosPrivate()

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['get-posts-saved'],
    queryFn: async ({ pageParam: currentPage }) => {
      const res: DataResponse = await axios.get(`${FORUM_SERVICE}/post-saves`, {
        params: {
          currentPage,
          pageSize: 10,
        },
      })

      if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
        return {
          posts: res?.data?.metadata?.data as Post,
          total: res?.data?.metadata?.total,
        }
      } else {
        throw new Error('')
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length) {
        return allPages.length + 1
      }
      return undefined
    },
    refetchOnWindowFocus: false,
  })

  const postsSaved = data?.pages?.flatMap(({ posts }) => posts) ?? []

  return {
    postsSaved,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    refetch,
  }
}
