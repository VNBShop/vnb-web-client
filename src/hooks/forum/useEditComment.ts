import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { useCommentItemContext } from '@/context/comment-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Comment } from '../../../types/forum'

export type EditCommentPayload = {
  comment: string
  commentId: Comment['commentId']
}

type IProps = {
  onSuccess: () => void
}

export default function useEditComment({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()

  const { setCommnets } = useCommentItemContext()

  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    EditCommentPayload
  >({
    mutationFn: async (payload) => {
      return await axios.put(
        `${FORUM_SERVICE}/comments/${payload?.commentId}`,
        {
          comment: payload.comment,
        }
      )
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        setCommnets((prev) => {
          const findIndex = prev.findIndex(
            (cmt) => cmt.commentId === payload?.commentId
          )

          if (findIndex !== -1) {
            const newCmts = [...prev]

            newCmts[findIndex] = {
              ...newCmts[findIndex],
              commentContent: payload.comment,
            }

            return newCmts
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
    onEditComment: mutate,
    loading: isPending,
  }
}
