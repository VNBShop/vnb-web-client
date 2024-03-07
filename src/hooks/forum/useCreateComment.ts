import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

export type CreateCommentPayload = {
  comment: string
}

type IProps = {
  onSuccess: () => void
}

export default function useCreateComment({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { post, pageKey } = usePostItemContext()

  const { isSuccess, isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    CreateCommentPayload
  >({
    mutationFn: async (payload) => {
      return await axios.post(`${FORUM_SERVICE}/comments`, {
        ...payload,
        postId: post?.postId,
      })
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.refetchQueries({
          queryKey: ['get-comments', post?.postId],
        })
        onSuccess()

        await client.invalidateQueries({
          queryKey: [pageKey],
        })
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
