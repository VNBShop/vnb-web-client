import { useInfiniteQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { MESSAGE_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { ChatCard } from '../../../types/messenger'

export default function useFetchChats() {
  const axios = useAxiosPrivate()

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-messages'],
    queryFn: async ({ pageParam: currentPage }) => {
      const res: DataResponse = await axios.get(`${MESSAGE_SERVICE}/messages`, {
        params: {
          currentPage,
          pageSize: 30,
        },
      })

      if (res?.data?.success) {
        return {
          messages: res?.data?.metadata?.messages as ChatCard[],
          total: res?.data?.metadata?.total as number,
        }
      } else {
        throw new Error('Cant not fetch this message!')
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 30) > allPages.length)
        return allPages.length + 1
      return undefined
    },
    refetchOnWindowFocus: false,
  })

  const messages = data?.pages?.flatMap(({ messages }) => messages) ?? []

  console.log('mess >>>', messages)

  // console.log('data >>', data)

  return {
    messages,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
