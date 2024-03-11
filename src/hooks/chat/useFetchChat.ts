import { useState } from 'react'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { MESSAGE_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Chat, ChatResponse } from '../../../types/messenger'

type IProps = {
  chatId: string
}

export default function useFetchChat({ chatId }: IProps) {
  const axios = useAxiosPrivate()

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-message', chatId],
    queryFn: async ({ pageParam: currentPage }) => {
      const res: DataResponse = await axios.get(
        `${MESSAGE_SERVICE}/messages/${chatId}`,
        {
          params: {
            currentPage,
            pageSize: 10,
          },
        }
      )
      if (res?.data?.success) {
        return {
          messages: res?.data?.metadata?.data as Chat[],
          total: res?.data?.metadata?.total as number,
          room: res?.data?.metadata?.room as string,
        }
      } else {
        throw new Error('Cant not fetch this message!')
      }
    },
    enabled: !!chatId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length)
        return allPages.length + 1
      return undefined
    },
    refetchOnWindowFocus: false,
  })

  const messages = data?.pages?.flatMap(({ messages }) => messages) ?? []
  const room = data?.pages[0]?.room ?? null

  return {
    messages,
    room,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
