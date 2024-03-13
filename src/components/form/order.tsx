'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { orderSchema } from '@/lib/validations/product'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Inputs = z.infer<typeof orderSchema>
export default function OrderForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = (values: Inputs) => {}

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex justify-end">
          <Button className="h-9">Order</Button>
        </div>
        <section className=" flex space-x-5">
          <section className="w-[55%] space-y-4">
            <FormField
              name="fullname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Fullname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Phone name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
      </form>
    </Form>
  )
}
