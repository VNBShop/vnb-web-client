import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

export type LikeActionPayload = {
  postId: Post['postId']
  reacted: boolean
}

export default function useLikePost() {
  const axios = useAxiosPrivate()
  const client = useQueryClient()
  const { mutate } = useMutation<DataResponse, DataError, LikeActionPayload>({
    mutationFn: async (payload) => {
      return axios.post(`${FORUM_SERVICE}/reactions`, payload)
    },
    onMutate: async (payload) => {
      await client.cancelQueries({
        queryKey: ['get-posts'],
      })

      const previousData = await client.getQueryData(['get-posts'])

      await client.setQueryData(
        ['get-posts'],
        (oldData: InfiniteData<Post[], unknown>) => {
          const oldPages: Post[] = oldData?.pages?.flat() ?? []

          const postId = payload?.postId

          const findIndex = oldPages?.findIndex(
            (item) => item?.postId === postId
          )

          if (findIndex !== -1 && oldPages?.length) {
            oldPages[findIndex] = {
              ...oldPages[findIndex],
              reacted: true,
            }

            const newPages = [oldPages]

            return {
              ...oldData,
              pages: newPages,
            }
          }

          return oldData
        }
      )

      return {
        previousData,
      }
    },
    onError: async (
      _error: DataError,
      _variables: LikeActionPayload,
      context: any
    ) => {
      await client.setQueryData(['get-posts'], context.previousData)
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: ['get-posts'],
        refetchType: 'none',
      })
    },
  })

  return {
    onLike: mutate,
  }
}
