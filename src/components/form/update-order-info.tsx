import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Spiner from '@/common/spiner'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import { UpdateInfoOrderSchema } from '@/lib/validations/user'

import { User } from '../../../types/user'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import InputNumber from '../ui/input-number'

type Inputs = z.infer<typeof UpdateInfoOrderSchema>

type IProps = {
  user: User
  onCloseModal: () => void
}

export default function UpdateOrderInfoForm({ user, onCloseModal }: IProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(UpdateInfoOrderSchema),
    defaultValues: {
      address: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  })

  const { loading, onUpdateInfo } = useUpdateUser({ onCloseModal })

  const onSubmit = (values: Inputs) => {
    onUpdateInfo(values)
  }

  useEffect(() => {
    if (!!user) {
      form.setValue('firstName', user?.firstName ?? '')
      form.setValue('lastName', user?.lastName ?? '')
      form.setValue('phoneNumber', user?.phoneNumber ?? '')
      form.setValue('address', user?.address ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user)])
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <section className=" grid gap-4 lg:grid-cols-2 lg:gap-7">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>

                <FormControl>
                  <Input {...field} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>

                <FormControl>
                  <Input {...field} placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>

              <FormControl>
                <InputNumber {...field} placeholder="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>

              <FormControl>
                <Input {...field} placeholder="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full space-x-1">
          {loading && <Spiner size={16} />}
          <span>Update</span>
        </Button>
      </form>
    </Form>
  )
}
