import { useEffect, useState } from 'react'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { MESSAGE_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Notification } from '../../../types/forum'

export default function useFetchNotify() {
  const axios = useAxiosPrivate()

  const [notifys, setNotifys] = useState<Notification[]>([])
  const [page, setPage] = useState(1)

  const { data, isPending, isError } = useQuery({
    queryKey: ['get-posts', page],
    queryFn: async ({ queryKey }) => {
      const res: DataResponse = await axios.get(
        `${MESSAGE_SERVICE}/notifications`,
        {
          params: {
            currentPage: queryKey[1],
            pageSize: 10,
          },
        }
      )

      if (res?.data?.success) {
        return {
          notifications: res?.data?.metadata?.messages?.notifications,
          hasNextPage: !!res?.data?.metadata?.nextPage ?? false,
        }
      } else {
        throw new Error('')
      }
    },
    refetchOnWindowFocus: false,
  })

  const onFetchNextPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setNotifys((prev) => [...prev, ...(data?.notifications ?? [])])
  }, [data?.notifications])

  return {
    notifys,
    isPending,
    isError,
    hasNextPage: data?.hasNextPage,
    onFetchNextPage,
    setNotifys,
  }
}
