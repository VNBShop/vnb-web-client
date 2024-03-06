import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { PRODUCT_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { ProductDetail } from '../../../types/products'

export type CreateProductCmtPayload = {
  productId: ProductDetail['productId']
  comment: string
}

type IProps = {
  onSuccess: () => void
}

export default function useCreateProductCmt({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    CreateProductCmtPayload
  >({
    mutationFn: async (payload) => {
      return axios.post(`${PRODUCT_SERVICE}/products/comments`, payload)
    },
    onSuccess: (res) => {
      if (res?.data?.success) {
        onSuccess()
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.metadata ?? 'Cant not comment on this product!'
      )
    },
  })
  return {
    loading: isPending,
    onCreateCmt: mutate,
  }
}
