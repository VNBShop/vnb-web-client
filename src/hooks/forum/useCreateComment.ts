import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

export type CreateCommentPayload = {
  postId: Post['postId']
  comment: string
}

type IProps = {
  onSuccess: () => void
}

export default function useCreateComment({ onSuccess }: IProps) {
  const client = useQueryClient()
  const axios = useAxiosPrivate()
  const { isSuccess, isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    CreateCommentPayload
  >({
    mutationFn: async (payload) => {
      return await axios.post(`${FORUM_SERVICE}/comments`, payload)
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        await client.setQueryData(
          ['get-comments', payload.postId],
          (oldData?: InfiniteData<Comment[][], unknown>) => {
            if (!oldData) {
              if (res?.data?.metadata?.comment) {
                return {
                  pages: [[res.data.metadata.comment]],
                  pageParams: [undefined],
                }
              }
              return null
            }

            const oldPages = oldData.pages ?? []
            const newComment = res?.data?.metadata?.comment

            if (newComment) {
              const newPages = [[newComment], ...oldPages]
              return {
                ...oldData,
                pages: newPages,
              }
            }

            return oldData
          }
        )

        await client.setQueryData(
          ['get-posts'],
          (oldData?: InfiniteData<Post[], unknown>) => {
            const oldPages: Post[] = oldData?.pages?.flat() ?? []
            const newCount = res?.data?.metadata?.commentCount
            const postId = res?.data?.metadata?.postId

            const findIndex = oldPages?.findIndex(
              (item) => item?.postId === postId
            )

            if (findIndex !== -1 && newCount && oldPages?.length) {
              oldPages[findIndex] = {
                ...oldPages[findIndex],
                totalComment: newCount,
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
        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.metadata ?? 'Cant not create comment on this post!'
      )
    },
  })

  return {
    onComment: mutate,
    loading: isPending,
    isSuccess,
  }
}
