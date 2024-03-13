import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

type IProps = {
  onClose: () => void
}

export default function useDetetePost({ onClose }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { post, pageKey } = usePostItemContext()

  const { isPending, mutate } = useMutation<DataResponse, DataError>({
    mutationFn: async () => {
      return await axios.delete(`${FORUM_SERVICE}/posts/${post.postId}`)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: pageKey,
        })

        onClose()
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata ?? 'Cant not delete this post!')
    },
  })

  return {
    onDeletePost: mutate,
    loading: isPending,
  }
}
