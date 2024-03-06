import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { useCommentItemContext } from '@/context/comment-item'
import { usePostFetchContext } from '@/context/post-fetch'
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

  const { post } = usePostItemContext()

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
          queryKey: ['get-posts'],
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
