'use client'

import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Icon from '@/common/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateCartItemSchema } from '@/lib/validations/product'

import { ProductDetail } from '../../../types/products'
import { Button } from '../ui/button'

type Inputs = z.infer<typeof updateCartItemSchema>

type AddToCardFormProps = {
  productStocks: ProductDetail['productStocks']
  productIsHaveSize: ProductDetail['productIsHaveSize']
}

export default function AddToCardForm({
  productStocks,
  productIsHaveSize,
}: AddToCardFormProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
    },
  })

  const onSubmit = (value: Inputs) => {
    // console.log(value)
  }

  return (
    <>
      {productStocks?.length && !!productIsHaveSize ? (
        <section>
          <h3 className=" text-gray-500">Choose size</h3>
          <ul className="gap- mb-4 mt-2 flex items-center gap-2">
            {productStocks.map((stock) => (
              <li
                key={stock?.productStockId}
                className="rounded border border-gray-100 p-1 px-2 text-xs hover:cursor-pointer lg:hover:bg-secondary lg:hover:text-white"
              >
                {stock?.productStockSize}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <Form {...form}>
        <form
          className="flex items-center gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <section className="flex max-w-[150px] items-center gap-2">
            <button
              className="flex items-center justify-center rounded-full border p-[2px]"
              onClick={() => {
                form.setValue(
                  'quantity',
                  Math.max(1, form.getValues('quantity') - 1)
                )
              }}
              disabled={isPending || form.getValues('quantity') === 1}
            >
              <Icon name="Minus" width={22} height={22} />
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
                      className="h-8 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
              className="flex items-center justify-center rounded-full border p-[2px]"
              onClick={() => {
                form.setValue('quantity', form.getValues('quantity') + 1)
              }}
            >
              <Icon name="Plus" width={22} height={22} />
            </button>
          </section>

          <Button className="h-8 bg-black text-white">Add to cart</Button>
        </form>
      </Form>
    </>
  )
}
