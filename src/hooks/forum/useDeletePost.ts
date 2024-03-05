import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostFetchContext } from '@/context/post-fetch'
import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

type IProps = {
  onClose: () => void
}

export default function useDetetePost({ onClose }: IProps) {
  const axios = useAxiosPrivate()

  const { setPosts } = usePostFetchContext()
  const { post } = usePostItemContext()

  const { isPending, mutate } = useMutation<DataResponse, DataError>({
    mutationFn: async () => {
      return await axios.delete(`${FORUM_SERVICE}/posts/${post.postId}`)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        setPosts((prev) => prev.filter((p) => p?.postId !== post?.postId))

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
