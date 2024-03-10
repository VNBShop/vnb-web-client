'use client'

import { useEffect } from 'react'

import usePaymentVNpay from '@/hooks/payment/usePaymentVNpay'

type IProps = {
  paymentInfo: Record<string, any>
}

export default function PaymentVNPayRedirect({ paymentInfo }: IProps) {
  const { onPaymentVNPay, isPending } = usePaymentVNpay()

  useEffect(() => {
    console.log('is re-render', paymentInfo?.vnp_TxnRef)
    onPaymentVNPay({
      paymentInfo,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isPending) {
    return
  }

  return <></>
}
