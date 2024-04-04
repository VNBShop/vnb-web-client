import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

type SavePostPayload = {
  postId: Post['postId']
}

type IProps = {
  onSuccess?: () => void
  isDetail?: boolean
}

export default function useSavePost({ onSuccess, isDetail }: IProps = {}) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { pageKey } = usePostItemContext()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    SavePostPayload
  >({
    mutationFn: async (payload) => {
      return axios.post(`${FORUM_SERVICE}/post-saves`, payload)
    },
    onSuccess: async (response, payload) => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: pageKey,
        })

        toast.success('Post has been saved!')
        onSuccess?.()
      }
    },
    onError: (err) => {
      toast.error(
        (err?.response?.data?.metadata as string) ?? 'Cant not save this post!'
      )
    },
  })
  return {
    onSavePost: mutate,
    loading: isPending,
  }
}
