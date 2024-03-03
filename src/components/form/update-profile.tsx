import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import Spiner from '@/common/spiner'
import useUpdateUser, { UpdateUserPayload } from '@/hooks/user/useUpdateUser'
import { UpdateProfileSchema } from '@/lib/validations/user'

import { User } from '../../../types/user'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
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

type Inputs = z.infer<typeof UpdateProfileSchema>

type IProps = {
  user: User
  onCloseModal: () => void
}

export default function UpdateProfileForm({ onCloseModal, user }: IProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      address: '',
      firstName: '',
      gender: '',
      lastName: '',
    },
  })

  const { loading, onUpdateInfo } = useUpdateUser({ onCloseModal })

  const onSubmit = (values: Inputs) => {
    const payload = {
      ...values,
      dateOfBirth: values?.dateOfBirth
        ? dayjs(values.dateOfBirth).toISOString()
        : undefined,
    }

    onUpdateInfo(payload as UpdateUserPayload)
  }

  useEffect(() => {
    if (!!user) {
      form.setValue('address', user?.address ?? '')
      form.setValue('dateOfBirth', user?.dateOfBirth ?? '')
      form.setValue('firstName', user?.firstName ?? '')
      form.setValue('lastName', user?.lastName ?? '')
      form.setValue('gender', user?.gender ?? '')
      form.setValue('phoneNumber', user?.phoneNumber ?? '')
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

        <section className=" grid gap-4 lg:grid-cols-2 lg:gap-7">
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>

                <FormControl>
                  <Calendar
                    mode="single"
                    date={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <section className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="field-male"
                    onChange={field.onChange}
                    name={field.name}
                    value="MALE"
                    defaultChecked={field?.value === 'MALE' ? true : false}
                  />
                  <FormLabel htmlFor="field-male">Male</FormLabel>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="field-female"
                    onChange={field.onChange}
                    name={field.name}
                    value="FEMALE"
                    defaultChecked={field?.value === 'FEMALE' ? true : false}
                  />
                  <FormLabel htmlFor="field-female">Female</FormLabel>
                </div>
              </section>
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
