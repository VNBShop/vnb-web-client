import { useMutation } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
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
    onSuccess: async (res) => {
      if (res?.data?.success) {
        // await client.refetchQueries({
        //   queryKey: ['get-user-cart'],
        // })
        router.push('/profile/ordered')
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata ?? 'Cant order!')
    },
  })
  return {
    loading: isPending,
    onCreateOrder: mutate,
  }
}
