import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

type UnsavePostPayload = {
  postId: Post['postId']
}

type IProps = {
  onSuccess?: () => void
}

export default function useUnsavePost({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { pageKey } = usePostItemContext()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    UnsavePostPayload
  >({
    mutationFn: async (payload) => {
      return axios.delete(`${FORUM_SERVICE}/post-saves/${payload?.postId}`)
    },
    onSuccess: async (response) => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: pageKey,
        })
        toast.success('Post has been unsaved!')
        onSuccess?.()
      }
    },
    onError: (err) => {
      toast.error(
        (err?.response?.data?.metadata as string) ??
          'Cant not unsave this post!'
      )
    },
  })
  return {
    onUnsavePost: mutate,
    loadingUnsave: isPending,
  }
}
