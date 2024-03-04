import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

type IProps = {
  postId: Post['postId']
}

export default function useFetchComments({ postId }: IProps) {
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
    queryKey: ['get-comments', postId],
    queryFn: async ({ pageParam: currentPage, queryKey }) => {
      const postId = queryKey[1]
      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/comments/${postId}`,
        {
          params: {
            currentPage,
            pageSize: 5,
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
    refetchOnMount: false,
    enabled: !!postId,
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
