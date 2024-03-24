'use client'
import { createRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { toast } from 'sonner'
import { z } from 'zod'

import { forgotPassword, resetPassword } from '@/api/auth/forgot-password'
import { OTPPayloadProps, confirmOTP } from '@/api/auth/otp'
import Spiner from '@/common/spiner'
import ModalOTP, { ModalOTPProps } from '@/components/modal-otp'
import ModalResetPassword, {
  ModalResetProps,
} from '@/components/modals/reset-password'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ModalProps } from '@/components/ui/modal'
import {
  OTPSchema,
  forgotPassSchema,
  resetPasswordSchema,
  signUpSchema,
} from '@/lib/validations/auth'

import { DataError, DataResponse } from '../../../types'

type Inputs = z.infer<typeof forgotPassSchema>

export default function ForgotPasswordForm() {
  const router = useRouter()

  const [modalOTP, setModalOTP] = useState(false)
  const [modalReset, setModalReset] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: '',
    },
  })

  const [payloadVerify, setPayloadVerify] = useState<ModalOTPProps['meta']>(
    {} as ModalOTPProps['meta']
  )

  const [email, setEmail] = useState<ModalResetProps['email']>('')

  const mutationFindAccount = useMutation<
    DataResponse,
    DataError,
    Inputs,
    unknown
  >({
    mutationFn: forgotPassword,
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success('Find account successfully!')
        setPayloadVerify((prev) => ({
          ...prev,
          email: data.email,
          title: 'Confirm your account',
        }))
        setModalOTP(true)
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
  })

  const mutationVerifyAccount = useMutation<
    DataResponse,
    DataError,
    OTPPayloadProps,
    unknown
  >({
    mutationFn: confirmOTP,
    onSuccess: (response, data) => {
      if (response.data.success) {
        toast.success('Verify account successfully!')

        setEmail(data.email)
        setModalOTP(false)
        setModalReset(true)
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
  })

  const mutationResetPassword = useMutation<
    DataResponse,
    DataError,
    z.infer<typeof signUpSchema>
  >({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Reset password successfully!')
        setModalReset(false)
        router.push('/signin')
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
  })

  const onSubmitFindAccount = (values: Inputs) => {
    mutationFindAccount.mutate(values)
  }

  const onSubmitVerify = (values: z.infer<typeof OTPSchema>) => {
    const payload: OTPPayloadProps = {
      email: payloadVerify.email,
      otpCode: values.otp,
      type: 'RESET_PASSWORD',
    }

    mutationVerifyAccount.mutate(payload)
  }

  const onSubmitResetPassword = (
    values: z.infer<typeof resetPasswordSchema>
  ) => {
    const payload: z.infer<typeof signUpSchema> = {
      ...values,
      email: email,
    }
    mutationResetPassword.mutate(payload)
  }

  return (
    <>
      <ModalOTP
        open={modalOTP}
        type="RESET_PASSWORD"
        onClose={() => setModalOTP(false)}
        meta={payloadVerify}
        onSubmit={onSubmitVerify}
        isPending={mutationVerifyAccount.isPending}
      />

      <ModalResetPassword
        open={modalReset}
        onClose={() => setModalReset(false)}
        email={email}
        onSubmit={onSubmitResetPassword}
        isPending={mutationResetPassword.isPending}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitFindAccount)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="example@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="mt-7 flex items-center justify-end gap-2">
            <Button
              className="h-9"
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              disabled={mutationFindAccount.isPending}
              type="submit"
              className="flex h-9 items-center gap-2"
            >
              {mutationFindAccount.isPending && <Spiner size={18} />}
              Search
            </Button>
          </section>
        </form>
      </Form>
    </>
  )
}
