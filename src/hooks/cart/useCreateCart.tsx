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
  onCloseDrawer?: () => void
}

export default function useCreateCart({
  isMultiple,
  onCloseDrawer,
}: IProps = {}) {
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
          await client.refetchQueries({ queryKey: ['get-user-cart'] })
          router.push('/order')
          onCloseDrawer?.()
        } else {
          await client.refetchQueries({ queryKey: ['get-user-cart'] })
          toast.success('Add to card successfully!')
        }
      }
    },
    onError: (err) => {
      console.log('err', err)

      if (isMultiple) {
        toast('Out of stock', {
          classNames: {
            title: '!text-red-500',
          },
          description: (
            <section className="text-gray-600">
              {err?.response?.data?.metadata?.data?.map(
                (item: string, index: number) => <div key={index}>{item}</div>
              )}
            </section>
          ),
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
