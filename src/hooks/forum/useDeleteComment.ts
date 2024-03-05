import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { useCommentItemContext } from '@/context/comment-item'
import { usePostFetchContext } from '@/context/post-fetch'
import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { MetaCommentResponse } from './useFetchComments'

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
  const { setPosts } = usePostFetchContext()
  const { setCommnets, page } = useCommentItemContext()
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
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        setCommnets((prev) =>
          prev.filter((p) => p.commentId !== payload?.commnentId)
        )
        setPosts((prev) => {
          const findIndex = prev.findIndex((p) => p.postId === post?.postId)
          if (findIndex !== -1) {
            const newPosts = [...prev]

            newPosts[findIndex] = {
              ...newPosts[findIndex],
              totalComment: newPosts[findIndex]?.totalComment
                ? newPosts[findIndex].totalComment - 1
                : 0,
            }

            return newPosts
          }
          return prev
        })

        await client.setQueryData(
          [
            'get-comments',
            {
              postId: post?.postId,
              page,
            },
          ],
          (oldMeta: MetaCommentResponse) => {
            return {
              ...oldMeta,
              nextPage: oldMeta?.data?.length > 5,
            }
          }
        )

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
