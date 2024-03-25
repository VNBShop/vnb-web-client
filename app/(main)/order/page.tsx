'use client'
import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { z } from 'zod'

import Empty from '@/common/empty'
import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import OrderSkeleton from '@/components/skeletons/order-skeleton'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import OrderAction from '@/contents/ecommerce/order/order-action'

import useAddVoucher, { Voucher } from '@/hooks/order/useAddVoucher'
import useCreateOrder, {
  CreateOrderPayload,
} from '@/hooks/order/useCreateOrder'
import useFetchUser from '@/hooks/user/useFetchUser'

import { cn } from '@/lib/utils'

import { errorFallback } from '../../../public/common'
import { DataResponse } from '../../../types'
import { Cart } from '../../../types/order'
import { User } from '../../../types/user'

const VoucherSchema = z.object({
  voucherCode: z.string().min(1, {
    message: 'Please enter voucher code!',
  }),
})

type InputVoucher = z.infer<typeof VoucherSchema>

export default function OrderPage() {
  const deliveryRef = useRef<HTMLDivElement | null>(null)

  const [total, setTotal] = useState(0)
  const [discout, setDiscount] = useState(0)
  const [voucherCode, setVoucherCode] = useState('')

  const form = useForm<InputVoucher>({
    resolver: zodResolver(VoucherSchema),
    defaultValues: {
      voucherCode: '',
    },
  })

  const {
    data: user,
    isFetching: fetchingUser,
    isLoading: loadingUser,
  } = useFetchUser()

  const { loading, onCreateOrder } = useCreateOrder()

  const {
    data,
    isLoading: loadingCarts,
    isFetching: fetchingCarts,
  } = useQuery<DataResponse>({
    queryKey: ['get-user-cart'],
    refetchOnWindowFocus: false,
  })

  const carts = (data?.data?.metadata as Cart[]) ?? []

  const onSubmit = () => {
    if (!carts?.length) {
      toast.error('Your cart is empty, cant not order')
      return
    }

    if (!user?.address || !user?.firstName || !user?.phoneNumber) {
      toast.error('Please fill your information for ordering!')
      if (deliveryRef.current) {
        deliveryRef.current.style.borderColor = 'red'
        deliveryRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
      }

      return
    }

    const payload: CreateOrderPayload = {
      cartIds: carts.map((cart) => cart.cartId),
      paymentType: 'CASH',
      voucherCode: voucherCode,
    }

    onCreateOrder(payload)
  }

  const onCheckoutVNpay = () => {
    if (!carts?.length) {
      toast.error('Your cart is empty, cant not order')
      return
    }

    if (!user?.address || !user?.firstName || !user?.phoneNumber) {
      toast.error('Please fill your information for ordering!')
      if (deliveryRef.current) {
        deliveryRef.current.style.borderColor = 'red'
        deliveryRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
      }

      return
    }

    const payload: CreateOrderPayload = {
      cartIds: carts.map((cart) => cart.cartId),
      paymentType: 'CREDIT',
      voucherCode: voucherCode,
    }

    onCreateOrder(payload)
  }

  const { loadingAddVoucher, onAddVoucher } = useAddVoucher({
    onSuccess: (
      payload: Pick<Voucher, 'maxDiscount' | 'voucherCode' | 'voucherPercent'>
    ) => {
      const totalTemp =
        carts?.reduce(
          (acc, curr) => acc + curr?.quantity * curr?.productPriceUnit,
          0
        ) ?? 0
      const discountF = totalTemp * payload?.voucherPercent
      const discountAmount =
        totalTemp -
        (discountF > payload?.maxDiscount ? payload?.maxDiscount : discountF)

      setDiscount(
        discountF > payload?.maxDiscount ? payload?.maxDiscount : discountF
      )

      setTotal(discountAmount)
      setVoucherCode(payload?.voucherCode)
      toast.success('Apply voucher successfully!')
    },
  })

  const onSubmitAddVoucher = ({ voucherCode }: InputVoucher) => {
    if (!voucherCode) return
    onAddVoucher({
      voucherCode,
    })
  }

  useEffect(() => {
    if (!!carts?.length) {
      const total = carts?.reduce(
        (acc, curr) => acc + curr?.quantity * curr?.productPriceUnit,
        0
      )

      setTotal(total)
    }
  }, [carts])

  return fetchingCarts || fetchingUser || loadingCarts || loadingUser ? (
    <OrderSkeleton />
  ) : (
    <>
      <div className="fixed inset-0 z-[-1] bg-[rgba(244,245,250)]" />
      <section className="mx-auto mt-7 max-w-[1000px] bg-white p-4 lg:rounded-md">
        <header>
          <h2 className="text-xl font-medium">Ordering</h2>
          <p className="mt-1 text-gray-500">
            Fill in form to complete your order
          </p>

          <h3
            className="mt-5 inline-flex items-center gap-1 rounded border border-transparent py-1 pr-1"
            ref={deliveryRef}
          >
            <Icon name="Location" size={20} />
            <span>Delivery information</span>
            <OrderAction user={user as User} />
          </h3>
          <section className="ml-1 mt-2 space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <Icon name="User" size={15} />
              {`${user?.firstName} ${user?.lastName}`}
            </p>
            <p className="flex items-center gap-2">
              <Icon name="Phone" size={15} />

              {user?.phoneNumber ?? '--'}
            </p>
            <p className="flex items-center gap-2">
              <Icon name="Location" size={15} />
              {user?.address ?? '--'}
            </p>
          </section>
        </header>
      </section>
      <section className="mx-auto mt-5 max-w-[1000px] bg-white p-4 lg:rounded-md">
        <header>
          <h2 className="text-xl font-medium">Products</h2>
        </header>

        {carts?.length && !loadingCarts && !fetchingCarts ? (
          <section className="mt-7 flex h-full flex-col items-start gap-7 lg:flex-row">
            <ul className="w-full space-y-4 lg:w-[60%]">
              {carts.map((cart) => (
                <li
                  key={cart.cartId}
                  className="flex items-center justify-between border-b pb-4 last:border-none"
                >
                  <figure className="flex items-center gap-2">
                    <Image
                      alt={cart?.productName}
                      title={cart?.productName}
                      src={cart?.productImage ?? errorFallback}
                      width="0"
                      height="0"
                      className="h-full w-[70px] object-contain"
                      sizes="100vw"
                    />

                    <figcaption className="flex-1 space-y-2">
                      <p className="font-medium">{cart?.productName}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {cart.quantity}
                      </p>
                    </figcaption>
                  </figure>

                  <p
                    className="text-sm text-secondary"
                    suppressHydrationWarning
                  >
                    {cart?.productPriceUnit?.toLocaleString('vi-VI', {
                      currency: 'VND',
                      style: 'currency',
                    })}
                  </p>
                </li>
              ))}
            </ul>

            <div className="top-[60px] hidden h-[300px] w-[1px] bg-gray-200 lg:sticky lg:block"></div>

            <article className="top-[80px] -mt-1 w-full flex-1 space-y-3 lg:sticky">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitAddVoucher)}
                  className="flex items-center gap-2"
                >
                  <FormField
                    control={form.control}
                    name="voucherCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Add voucher"
                            className="h-10 flex-1 text-sm focus:ring-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button
                      disabled={loadingAddVoucher || loading}
                      size="sm"
                      type="submit"
                      variant="outline"
                      className="h-10 space-x-1 rounded-lg px-5"
                    >
                      {loadingAddVoucher && <Spiner size={16} />}
                      <span> Add</span>
                    </Button>
                    {!!form?.formState?.errors?.voucherCode?.message && (
                      <div> &nbsp;</div>
                    )}
                  </div>
                </form>
              </Form>
              <div className="flex items-center justify-between text-sm">
                <p>Shiping: </p>
                <p>Free</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>Tax: </p>
                <p>VAT</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p>Total temp: </p>
                <p>
                  {carts
                    ?.reduce(
                      (acc, curr) =>
                        acc + curr?.quantity * curr?.productPriceUnit,
                      0
                    )
                    ?.toLocaleString('vi-VI', {
                      currency: 'VND',
                      style: 'currency',
                    })}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p>Discount: </p>
                <p className={cn(discout > 0 && 'text-success')}>
                  -
                  {discout?.toLocaleString('vi-VI', {
                    currency: 'VND',
                    style: 'currency',
                  })}
                </p>
              </div>

              <hr />

              <div className="flex items-center justify-between text-sm">
                <p>Total: </p>
                <p className=" font-medium text-secondary">
                  {total?.toLocaleString('vi-VI', {
                    currency: 'VND',
                    style: 'currency',
                  })}
                </p>
              </div>

              <section className="!mt-7 space-y-4">
                <Button
                  className="w-full space-x-1"
                  onClick={onSubmit}
                  disabled={loading || loadingAddVoucher}
                >
                  {loading && <Spiner size={16} />}
                  <span> Cash on Delivery</span>
                </Button>
                <p className="text-center text-sm text-gray-600">Or</p>

                <Button
                  variant="outline"
                  className="flex w-full gap-1"
                  disabled={loading || loadingAddVoucher}
                  onClick={onCheckoutVNpay}
                >
                  {loading && <Spiner size={16} />}
                  <Icon name="QR" size={19} />
                  <p>
                    <span className="text-red-500">VN</span>
                    <span className="text-blue-500">PAY</span>
                  </p>
                </Button>
              </section>
            </article>
          </section>
        ) : (
          <Empty message="Your cart is empty" className="mx-auto w-[100px]" />
        )}
      </section>
    </>
  )
}
