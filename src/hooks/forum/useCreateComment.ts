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

  const { setCommnets } = useCommentItemContext()
  const { setPosts } = usePostFetchContext()
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
        setCommnets((prev) => [res?.data?.metadata?.comment, ...prev])
        setPosts((prev) => {
          const findIndex = prev.findIndex((p) => p.postId === post?.postId)

          if (findIndex !== -1) {
            const newPosts = [...prev]
            newPosts[findIndex] = {
              ...newPosts[findIndex],
              totalComment: newPosts[findIndex]?.totalComment
                ? newPosts[findIndex].totalComment + 1
                : 0,
            }

            return newPosts
          }

          return prev
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
