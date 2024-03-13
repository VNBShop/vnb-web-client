import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { MESSAGE_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { ChatCard } from '../../../types/messenger'

export type DeleteChatPayload = {
  receiverId: ChatCard['receiverId']
}

type IProps = {
  onSuccess?: () => void
}

export default function useDeleteChat({ onSuccess }: IProps = {}) {
  const axios = useAxiosPrivate()

  const client = useQueryClient()
  const router = useRouter()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    DeleteChatPayload
  >({
    mutationFn: async (payload) => {
      return axios.delete(`${MESSAGE_SERVICE}/messages/${payload?.receiverId}`)
    },
    onSuccess: async (response) => {
      if (response?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-messages'],
        })

        onSuccess?.()

        router.push('/conversation')
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.metadata ?? 'Cant not delete this message!'
      )
    },
  })

  return {
    onDeleteMessage: mutate,
    loading: isPending,
  }
}
