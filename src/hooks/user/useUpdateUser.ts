import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { USER_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

export type UpdateUserPayload = {
  firstName?: string
  lastName?: string
  gender?: 'MALE' | 'FEMALE'
  phoneNumber?: string
  dateOfBirth?: string
  avatar?: {
    assetId: string
    secureUrl: string
  }
  address?: string
}

type IProps = {
  onCloseModal?: () => void
}

export default function useUpdateUser({ onCloseModal }: IProps = {}) {
  const client = useQueryClient()
  const axios = useAxiosPrivate()
  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    UpdateUserPayload
  >({
    mutationFn: async (payload) => {
      return axios.put(`${USER_SERVICE}/users`, payload)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.refetchQueries({
          queryKey: ['get-user-profile'],
        })
        onCloseModal?.()
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata ?? 'Cant update user info!')
    },
  })
  return {
    loading: isPending,
    onUpdateInfo: mutate,
  }
}
