import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Comment } from '../../../types/forum'

export type CreateCommentPayload = {
  commnentId: Comment['commentId']
}

type IProps = {
  onClose: () => void
}

export default function useDeteteComment({ onClose }: IProps) {
  const axios = useAxiosPrivate()

  const client = useQueryClient()
  const { post } = usePostItemContext()

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
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-comments', post?.postId],
        })
        onClose()
        await client.invalidateQueries({
          queryKey: ['get-posts'],
        })
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
