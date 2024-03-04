import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    onSuccess: (res, payload) => {
      if (res?.data?.success) {
        client.refetchQueries({
          queryKey: ['get-comments', payload.postId],
        })
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
