import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { toast } from 'sonner'

import { DataError, DataResponse } from '../../../types'

export type ResendOTPPayload = {
  email: string
  type: 'REGISTER' | 'RESET_PASSWORD'
}

type IProps = {
  onSuccess?: () => void
}

export default function useResendOTP({ onSuccess }: IProps = {}) {
  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    ResendOTPPayload
  >({
    mutationFn: async (payload) => {
      console.log('payload', payload)

      return await axios.post(
        `${process.env.NEXT_SERVER_API_SERVICE}/user-service/api/v1/account/resend-confirmation-code`,
        payload
      )
    },
    onSuccess: (res) => {
      if (res?.data?.success) {
        toast.success('Resend OTP successfully, please check your email!')
        onSuccess?.()
      }
    },
    onError: (err) => {
      console.log('err', err)

      toast.error('Resend OTP faild, try again!')
    },
  })

  return {
    loading: isPending,
    onResendOTP: mutate,
  }
}
