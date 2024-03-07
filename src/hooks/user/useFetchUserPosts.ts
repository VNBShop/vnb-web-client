import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'

export default function useFetchUserPosts() {
  const axios = useAxiosPrivate()

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['get-posts-profile'],
    queryFn: async ({ pageParam: currentPage, queryKey }) => {
      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/posts/profiles`,
        {
          params: {
            currentPage,
            pageSize: 10,
          },
        }
      )

      if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
        return {
          posts: res?.data?.metadata?.data,
          total: res?.data?.metadata?.total,
        }
      } else {
        throw new Error('')
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length)
        return allPages.length + 1
      return undefined
    },
    refetchOnWindowFocus: false,
  })

  const posts = data?.pages?.flatMap(({ posts }) => posts) ?? []

  return {
    posts,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
