import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { ORDER_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'

type AddVoucherPayload = {
  voucherCode: string
}

type IProps = {
  onSuccess: (
    payload: Pick<Voucher, 'maxDiscount' | 'voucherCode' | 'voucherPercent'>
  ) => void
}

export type Voucher = {
  voucherId: number
  voucherCode: string
  maxDiscount: number
  voucherAmount: number
  quantity: number
  voucherPercent: number
  startedAt: string
  expiredAt: string
}

export default function useAddVoucher({ onSuccess }: IProps) {
  const axios = useAxiosPrivate()

  const { mutate, isPending } = useMutation<
    DataResponse,
    DataError,
    AddVoucherPayload
  >({
    mutationFn: async (payload) => {
      return await axios.get(
        `${ORDER_SERVICE}/vouchers/use-voucher/${payload?.voucherCode}`
      )
    },
    onSuccess: (response) => {
      if (response?.data?.success) {
        onSuccess({
          voucherPercent: response?.data?.metadata?.voucherPercent ?? 0,
          voucherCode: response?.data?.metadata?.voucherCode ?? '',
          maxDiscount: response?.data?.metadata?.maxDiscount ?? 0,
        })
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.metadata ?? 'Cant not add this voucher!')
    },
  })
  return {
    onAddVoucher: mutate,
    loadingAddVoucher: isPending,
  }
}
