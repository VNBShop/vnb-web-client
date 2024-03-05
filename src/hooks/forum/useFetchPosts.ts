import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Comment, Post } from '../../../types/forum'

type Filter = {
  page: number
}

export type MetaPostsResponse = {
  data: Post[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export default function useFetchPosts() {
  const axios = useAxiosPrivate()
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['get-commnents', page],
    queryFn: async ({ queryKey }) => {
      const res: DataResponse = await axios.get(`${FORUM_SERVICE}/posts`, {
        params: {
          currentPage: page,
          pageSize: 7,
        },
      })

      if (res?.data?.success) {
        return res?.data?.metadata as MetaPostsResponse
      } else {
        throw new Error('Cant not fetch posts')
      }
    },
    retry: 3,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const onNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const reFetchData = () => {
    setPage(1)
    setPosts([])
    refetch()
  }

  useEffect(() => {
    if (data?.data) {
      setPosts((prev) => [...prev, ...data?.data])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.data)])

  return {
    posts,
    isError,
    isFetching,
    isLoading,
    hasNextPage: !!data?.nextPage ?? false,
    onNextPage,
    setPosts,
    reFetchData,
  }
}
