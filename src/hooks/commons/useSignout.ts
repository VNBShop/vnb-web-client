import { useMutation } from '@tanstack/react-query'

import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { DataError, DataResponse } from '../../../types'

export default function useSignout() {
  const axios = useAxiosPrivate()
  const { mutate: onSignOut, isPending } = useMutation<
    DataResponse,
    DataError,
    unknown,
    unknown
  >({
    mutationFn: () => {
      const res = axios.post('/user-service/api/v1/account/logout')
      return res
    },
    onSuccess: (res) => {
      if (res?.data?.success) {
        signOut()
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
    retry: 5,
  })
  return {
    onSignOut,
    isPending,
  }
}
