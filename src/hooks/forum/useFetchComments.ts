import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Comment, Post } from '../../../types/forum'

type IProps = {
  postId: Post['postId']
}

type Filter = {
  page: number
  postId: Post['postId']
}

export type MetaCommentResponse = {
  data: Comment[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export default function useFetchComments({ postId }: IProps) {
  const axios = useAxiosPrivate()
  const [comments, setCommnets] = useState<Comment[]>([])
  const [page, setPage] = useState(1)

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: [
      'get-comments',
      {
        postId,
        page,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as Filter

      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/comments/${filter.postId}`,
        {
          params: {
            currentPage: filter.page,
            pageSize: 5,
          },
        }
      )

      if (res?.data?.success) {
        return res?.data?.metadata as MetaCommentResponse
      } else {
        throw new Error('Cant not fetch comment')
      }
    },
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const onNextPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (data?.data) {
      setCommnets((prev) => [...prev, ...data?.data])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.data)])

  return {
    comments,
    isError,
    isFetching,
    isLoading,
    hasNextPage: !!data?.nextPage ?? false,
    onNextPage,
    setCommnets,
    page,
  }
}
