import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { ORDER_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { ProductStock } from '../../../types/products'

export type CreateCartPayload = {
  productSizeId: ProductStock['productStockId']
  quantity: number
}

export default function useCreateCart() {
  const client = useQueryClient()
  const axios = useAxiosPrivate()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    CreateCartPayload
  >({
    mutationFn: async (payload) => {
      return await axios.post(`${ORDER_SERVICE}/carts`, payload)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        await client.refetchQueries({ queryKey: ['get-user-cart'] })
        toast.success('Add to card successfully!')
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata?.message ?? 'Server error!')
    },
  })
  return {
    onAddToCart: mutate,
    loading: isPending,
  }
}
