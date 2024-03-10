import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { PAYMENT_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

type PaymentVNPay = {
  paymentInfo: Record<string, any>
}
export default function usePaymentVNpay() {
  const axios = useAxiosPrivate()
  const router = useRouter()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    PaymentVNPay
  >({
    mutationFn: async (payload) => {
      return axios.post(
        `${PAYMENT_SERVICE}/payments/vnpay-success`,
        payload.paymentInfo
      )
    },
    onSuccess: async (response) => {
      if (response?.data?.success) {
        console.log('is run >>>')

        toast.success('Ordered has been successfully!')
        router.push('/profile/ordered')
      }
    },
    onError: async (err, payload) => {
      console.log('err payment checkout VNpay', err)

      return axios.post(`${PAYMENT_SERVICE}/payments/vnpay-error`, {
        vnp_TxnRef: payload?.paymentInfo?.vnp_TxnRef,
      })
    },
  })
  return {
    onPaymentVNPay: mutate,
    isPending,
  }
}
