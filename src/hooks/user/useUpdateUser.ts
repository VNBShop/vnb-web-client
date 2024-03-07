import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
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
  const router = useRouter()

  const { update, data: session } = useSession()
  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    UpdateUserPayload
  >({
    mutationFn: async (payload) => {
      return axios.put(`${USER_SERVICE}/users`, payload)
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: ['get-user-profile'],
        })

        if (payload?.firstName) {
          await update({
            ...session,
            user: {
              ...session?.user,
              firstName: payload.firstName,
            },
          })
        }

        if (payload?.lastName) {
          await update({
            ...session,
            user: {
              ...session?.user,
              lastName: payload.lastName,
            },
          })
        }

        if (payload?.avatar?.secureUrl) {
          console.log('run >>>')

          await update({
            ...session,
            user: {
              ...session?.user,
              avatar: payload.avatar.secureUrl,
            },
          })
        }

        toast.success('Update user info successfully!')
        router.refresh()
        await client.refetchQueries({
          queryKey: ['get-posts-profile'],
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
