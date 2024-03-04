import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Comment, Post } from '../../../types/forum'

export type CreateCommentPayload = {
  commnentId: Comment['commentId']
  postId: Post['postId']
}

type IProps = {
  onClose: () => void
}

export default function useDeteteComment({ onClose }: IProps) {
  const client = useQueryClient()
  const axios = useAxiosPrivate()
  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    CreateCommentPayload
  >({
    mutationFn: async (payload) => {
      return await axios.delete(
        `${FORUM_SERVICE}/comments/${payload.commnentId}`
      )
    },
    onSuccess: (res, payload) => {
      if (res?.data?.success) {
        client.refetchQueries({
          queryKey: ['get-comments', payload.postId],
        })
        onClose()
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.metadata ?? 'Cant not delete this comment!'
      )
    },
  })

  return {
    onDeleteComment: mutate,
    loading: isPending,
  }
}
