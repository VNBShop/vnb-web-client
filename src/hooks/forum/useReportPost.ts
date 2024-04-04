import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

import { Post } from '../../../types/forum'

type ReportPostPayload = {
  postId: Post['postId']
}

type IProps = {
  onSuccess?: () => void
  isDetail?: boolean
}

export default function useReportPost({ onSuccess, isDetail }: IProps = {}) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { pageKey } = usePostItemContext()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    ReportPostPayload
  >({
    mutationFn: async (payload) => {
      return axios.post(`${FORUM_SERVICE}/post-reports`, payload)
    },
    onSuccess: async (response, payload) => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: pageKey,
        })

        toast.success('Post has been reported!')
        onSuccess?.()
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata ?? 'Cant not report this post')
    },
  })
  return {
    onReportPost: mutate,
    loadingReport: isPending,
  }
}
