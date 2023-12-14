'use client'
import { useState } from 'react'

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

  const form = useForm<Inputs>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: '',
    },
  })

  const initStateModalVerify: ModalOTPProps = {
    meta: {
      email: '',
      title: '',
      type: 'REGISTER',
    },
    open: false,
    onClose: () => setModalVerify(initStateModalVerify),
  }
  const [modalVerify, setModalVerify] =
    useState<ModalOTPProps>(initStateModalVerify)

  const [modalResetPassword, setModalResetPassword] = useState<ModalResetProps>(
    {
      email: '',
      open: false,
      onClose: () =>
        setModalResetPassword({
          email: '',
          open: false,
        }),
    }
  )

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
        setModalVerify((prev) => ({
          ...prev,
          meta: {
            ...prev.meta,
            email: data.email,
            title: 'Confirm your account',
          },
          open: true,
        }))
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

        setModalResetPassword((prev) => ({
          ...prev,
          email: data.email,
          open: true,
        }))
        modalVerify.onClose?.()
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
        modalResetPassword.onClose?.()
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
      email: modalVerify.meta.email,
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
      email: modalResetPassword.email,
    }
    mutationResetPassword.mutate(payload)
  }

  return (
    <>
      <ModalOTP
        meta={modalVerify.meta}
        open={modalVerify.open}
        onClose={modalVerify.onClose}
        onSubmit={onSubmitVerify}
        isPending={mutationVerifyAccount.isPending}
      />

      <ModalResetPassword
        open={modalResetPassword.open}
        onClose={modalResetPassword.onClose}
        email={modalResetPassword.email}
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
