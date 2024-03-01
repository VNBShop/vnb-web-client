'use client'

import { useEffect, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import numeral from 'numeral'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useCreateCart, { CreateCartPayload } from '@/hooks/cart/useCreateCart'
import { cn } from '@/lib/utils'
import { updateCartItemSchema } from '@/lib/validations/product'

import { ProductDetail } from '../../../types/products'
import { Button } from '../ui/button'

type Inputs = z.infer<typeof updateCartItemSchema>

type IProps = {
  productStocks: ProductDetail['productStocks']
  productIsHaveSize: ProductDetail['productIsHaveSize']
  user: Session['user']
}

export default function AddToCardForm({
  productStocks,
  productIsHaveSize,
  user,
}: IProps) {
  const router = useRouter()

  const { onAddToCart, loading } = useCreateCart()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
      productSizeId: '',
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!user?.accessToken) {
      router.push('/signin')
      return
    }

    if (!values?.productSizeId) return

    const payload: CreateCartPayload = {
      ...values,
      productSizeId: numeral(values.productSizeId).value() as number,
    }

    onAddToCart(payload)
  }

  useEffect(() => {
    if (!productIsHaveSize) {
      form.setValue(
        'productSizeId',
        productStocks[0]?.productStockId?.toString()
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIsHaveSize])

  return (
    <>
      <Form {...form}>
        <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
          <div hidden={!productIsHaveSize}>
            <FormField
              control={form.control}
              name="productSizeId"
              defaultValue={
                !productIsHaveSize
                  ? productStocks[0]?.productStockId?.toString()
                  : ''
              }
              render={({ field }) => (
                <FormItem>
                  <>
                    <h3 className=" text-gray-500">Size:</h3>
                    <ul className="gap- mb-4 mt-2 flex items-center gap-2">
                      {productStocks.map((stock) => (
                        <li
                          key={stock?.productStockId}
                          onClick={() => {
                            if (!stock?.productStockQuantity) return
                            if (
                              field?.value === stock.productStockId.toString()
                            ) {
                              form.resetField('productSizeId')
                              return
                            }

                            form.setValue(
                              'productSizeId',
                              stock?.productStockId?.toString()
                            )

                            form.clearErrors('productSizeId')
                          }}
                          className={cn(
                            'rounded border border-gray-200 p-2 px-3 text-xs hover:cursor-pointer lg:hover:bg-secondary lg:hover:text-white',
                            field.value === stock?.productStockId?.toString()
                              ? 'bg-secondary text-white'
                              : '',
                            !stock?.productStockQuantity &&
                              'lg:hover:bg-bg-gray-100 bg-gray-100 text-gray-300 hover:cursor-default lg:hover:text-gray-300'
                          )}
                        >
                          {stock?.productStockSize}
                        </li>
                      ))}
                    </ul>
                  </>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <section className="flex items-center gap-4">
            {!!form.getValues('productSizeId') && !!productStocks?.length && (
              <section className="text-sm">
                <span>Quantity:{` `}</span>
                {
                  productStocks.find(
                    (stock) =>
                      stock?.productStockId?.toString() ===
                      form.getValues('productSizeId')
                  )?.productStockQuantity
                }
              </section>
            )}

            {!!form.getValues('productSizeId') && !!productStocks?.length && (
              <div className="h-4 w-[1px] bg-gray-300"></div>
            )}

            <section className="mb-7 mt-4 flex items-center">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md  hover:cursor-pointer lg:hover:bg-black lg:hover:text-white"
                onClick={() => {
                  form.setValue(
                    'quantity',
                    Math.max(1, form.getValues('quantity') - 1)
                  )
                }}
              >
                <Icon name="Minus" size={18} />
              </button>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        min={0}
                        className="h-8 w-[70px] rounded-none border-l-0 border-r-0 border-t-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        inputMode="numeric"
                        onChange={(e) => {
                          const value = e.target.value
                          const parseVal = parseInt(value, 10)
                          if (isNaN(parseVal)) return
                          field.onChange(parseVal)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                disabled={
                  form.getValues('quantity') >=
                  productStocks[0]?.productStockQuantity
                }
                className="flex h-8 w-8 items-center justify-center rounded-md lg:hover:bg-black lg:hover:text-white"
                onClick={() => {
                  form.setValue('quantity', form.getValues('quantity') + 1)
                }}
              >
                <Icon name="Plus" size={18} />
              </button>
            </section>
          </section>

          <Button
            disabled={loading}
            type="submit"
            className="h-10 space-x-1 bg-black text-white"
          >
            {loading && <Spiner size={16} />}
            <span> Add to cart</span>
          </Button>
        </form>
      </Form>
    </>
  )
}
