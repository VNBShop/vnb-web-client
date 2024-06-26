import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Comment, Post } from '../../../types/forum'

export type CreateCommentPayload = {
  commnentId: Comment['commentId']
  comment: string
  postId: Post['postId']
}

type IProps = {
  onSuccess: () => void
}

export default function useUpdateComment({ onSuccess }: IProps) {
  const client = useQueryClient()
  const axios = useAxiosPrivate()
  const { isSuccess, isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    CreateCommentPayload
  >({
    mutationFn: async (payload) => {
      return await axios.put(
        `${FORUM_SERVICE}/comments/${payload.commnentId}`,
        {
          comment: payload.comment,
        }
      )
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-comments', payload.postId],
        })
        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.metadata ?? 'Cant not update this commnent!'
      )
    },
  })

  return {
    onComment: mutate,
    loading: isPending,
    isSuccess,
  }
}
