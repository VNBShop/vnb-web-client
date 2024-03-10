import { useMutation } from '@tanstack/react-query'

import { redirect, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { ORDER_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { PaymentType } from '../../../types/order'

export type CreateOrderPayload = {
  cartIds: number[]
  paymentType: PaymentType
}

export default function useCreateOrder() {
  // const client = useQueryClient()
  const axios = useAxiosPrivate()
  const router = useRouter()

  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    CreateOrderPayload
  >({
    mutationFn: async (payload) => {
      return axios.post(`${ORDER_SERVICE}/orders/checkout-by-cart`, payload)
    },
    onSuccess: async (res, payload) => {
      console.log('check >>', res?.data?.metadata?.paymentUrl)

      if (res?.data?.success) {
        // await client.refetchQueries({
        //   queryKey: ['get-user-cart'],
        // })

        if (payload?.paymentType === 'CREDIT') {
          router.push(res?.data?.metadata?.paymentUrl)
        } else {
          router.push('/profile/ordered')
        }
      }
    },
    onError: (err) => {
      console.log('err order checkout', err)

      toast.error(err?.response?.data?.metadata ?? 'Cant order!')
    },
  })
  return {
    loading: isPending,
    onCreateOrder: mutate,
  }
}
