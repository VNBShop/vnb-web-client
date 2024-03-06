import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { PRODUCT_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { ProductDetail } from '../../../types/products'

export type DeleteProductCmtPayload = {
  productId: ProductDetail['productId']
}

type IProps = {
  onSuccess: () => void
  page: number
}

export default function useDeleteProductCmt({ onSuccess, page }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    DeleteProductCmtPayload
  >({
    mutationFn: async (payload) => {
      return axios.delete(`${PRODUCT_SERVICE}/products/comments/${payload}`)
    },
    onSuccess: async (res, payload) => {
      if (res?.data?.success) {
        await client.invalidateQueries({
          queryKey: [
            'get-product-comments',
            {
              productId: payload,
              page,
            },
          ],
        })
        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.metadata ?? 'Cant not delete this comment!'
      )
    },
  })
  return {
    loading: isPending,
    onDeleteCmt: mutate,
  }
}
