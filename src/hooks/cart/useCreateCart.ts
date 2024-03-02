import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { ORDER_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { ProductStock } from '../../../types/products'

export type CreateCartPayload = {
  productSizeId: ProductStock['productStockId']
  quantity: number
}

type IProps = {
  isMultiple?: boolean
}

export default function useCreateCart({ isMultiple }: IProps = {}) {
  const client = useQueryClient()
  const axios = useAxiosPrivate()
  const router = useRouter()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    CreateCartPayload | CreateCartPayload[]
  >({
    mutationFn: async (payload) => {
      return isMultiple
        ? await axios.post(`${ORDER_SERVICE}/carts/multiple`, {
            carts: payload,
          })
        : await axios.post(`${ORDER_SERVICE}/carts`, payload)
    },
    onSuccess: async (res) => {
      if (res?.data?.success) {
        if (isMultiple) {
          router.push('/order')
        } else {
          await client.refetchQueries({ queryKey: ['get-user-cart'] })
          toast.success('Add to card successfully!')
        }
      }
    },
    onError: (err) => {
      if (isMultiple) {
        toast('Out of stock', {
          description: 'HEHE',
        })
      } else {
        toast.error(
          err?.response?.data?.metadata ?? 'Cant not add to cart this product!'
        )
      }
    },
  })
  return {
    onAddToCart: mutate,
    loading: isPending,
  }
}
