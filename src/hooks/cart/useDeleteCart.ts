import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { ORDER_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Cart } from '../../../types/order'

type DeleteCartPayload = {
  id: Cart['cartId']
}

export default function useDeleteCart() {
  const axios = useAxiosPrivate()
  const client = useQueryClient()
  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    DeleteCartPayload
  >({
    mutationFn: async (payload) => {
      return await axios.delete(`${ORDER_SERVICE}/carts/${payload.id}`)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.prefetchQuery({
          queryKey: ['get-user-cart'],
        })
      }
    },
    onError: async (error) => {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Cant delete this cart!'
      )
    },
  })
  return {
    onDeleteCart: mutate,
    loading: isPending,
  }
}
