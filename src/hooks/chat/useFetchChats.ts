import { useEffect, useState } from 'react'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { MESSAGE_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { ChatCard } from '../../../types/messenger'

export default function useFetchChats() {
  const axios = useAxiosPrivate()

  const [page, setPage] = useState(1)
  const [messages, setMessages] = useState<ChatCard[]>([])

  const { data, isPending, isError } = useQuery({
    queryKey: ['get-messages', page],
    queryFn: async ({ queryKey }) => {
      const res: DataResponse = await axios.get(`${MESSAGE_SERVICE}/messages`, {
        params: {
          currentPage: queryKey[1],
          pageSize: 30,
        },
      })

      if (res?.data?.success) {
        return {
          messages: res?.data?.metadata?.messages as ChatCard[],
          hasNextPage: !!res?.data?.metadata?.nextPage ?? false,
        }
      } else {
        throw new Error('Cant not fetch this message!')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onFetchNextPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setMessages((prev) => [...prev, ...(data?.messages ?? [])])
  }, [data?.messages])

  return {
    messages,
    isError,
    isPending,
    hasNextPage: data?.hasNextPage,
    setMessages,
    onFetchNextPage,
  }
}
