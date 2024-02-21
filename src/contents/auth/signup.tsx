'use client'

import { createRef, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { OTPPayloadProps, confirmOTP } from '@/api/auth/otp'
import { signup } from '@/api/auth/signup'
import Spiner from '@/common/spiner'
import ModalOTP, { ModalOTPProps } from '@/components/modal-otp'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import InputPassword from '@/components/ui/input-password'
import { ModalProps } from '@/components/ui/modal'
import { OTPSchema, signUpSchema } from '@/lib/validations/auth'

import { DataError, DataResponse } from '../../../types'

type Inputs = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const [verifyPayload, setVerifyPayload] = useState<ModalOTPProps['meta']>(
    {} as ModalOTPProps['meta']
  )

  const [modalVerify, setModalVerify] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const mutationSigup = useMutation<DataResponse, DataError, Inputs, unknown>({
    mutationFn: signup,
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success('Signup successfully!')
        setVerifyPayload((prev) => ({
          ...prev,
          email: data.email,
          title: 'Confirm your account',
        }))
        setModalVerify(true)
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
  })

  const onSubmit = (data: Inputs) => {
    mutationSigup.mutate(data)
  }

  const mutationVerify = useMutation<
    DataResponse,
    DataError,
    OTPPayloadProps,
    unknown
  >({
    mutationFn: confirmOTP,
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Verify successfully!')
        setModalVerify(false)
        router.push('/signin')
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
  })

  const onSubmitVerify = (values: z.infer<typeof OTPSchema>) => {
    const payload: OTPPayloadProps = {
      email: verifyPayload.email,
      otpCode: values.otp,
      type: 'REGISTER',
    }
    mutationVerify.mutate(payload)
  }

  return (
    <>
      <ModalOTP
        open={modalVerify}
        onClose={() => setModalVerify(false)}
        meta={verifyPayload}
        onSubmit={onSubmitVerify}
        isPending={mutationVerify.isPending}
      />

      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={mutationSigup.isPending}
            className="flex items-center gap-2 bg-black text-white"
          >
            {mutationSigup.isPending && <Spiner size={20} />}
            Continue
          </Button>
        </form>
      </Form>
    </>
  )
}
