import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Photo } from '../../../types/user'

type IProps = {
  onSuccess: () => void
  pageKey: string
}

export type CreatePostPayload = {
  content: string
  tags?: string[]
  postAssets: Photo[]
}

export default function useCreatePost({ onSuccess, pageKey }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    CreatePostPayload
  >({
    mutationFn: async (payload) => {
      return await axios.post(`${FORUM_SERVICE}/posts`, payload)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.refetchQueries({
          queryKey: [pageKey],
        })
        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata ?? 'Cant not create post!')
    },
  })
  return {
    onCreatePost: mutate,
    loading: isPending,
  }
}
