import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Comment } from '../../../types/forum'

export type MetaCommentssResponse = {
  data: Comment[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export default function useFetchComments() {
  const axios = useAxiosPrivate()

  const { post } = usePostItemContext()

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['get-comments', post?.postId],
    queryFn: async ({ pageParam: currentPage, queryKey }) => {
      console.log('currentPage >', currentPage)
      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/comments/${queryKey[1]}`,
        {
          params: {
            currentPage,
            pageSize: 5,
          },
        }
      )

      if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
        return {
          comments: res?.data?.metadata?.data,
          total: res?.data?.metadata?.total,
        }
      } else {
        throw new Error('')
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 5) > allPages.length)
        return allPages.length + 1
      return undefined
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!post?.postId,
    retry: 1,
  })

  const comments = data?.pages?.flatMap(({ comments }) => comments) ?? []

  return {
    comments,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
