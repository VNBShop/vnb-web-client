'use client'

import {
  ComponentPropsWithoutRef,
  RefObject,
  createRef,
  useRef,
  useState,
} from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { OTPPayloadProps, confirmOTP } from '@/api/auth/otp'
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
import { OTPSchema, loginSchema } from '@/lib/validations/auth'

import { DataError, DataResponse } from '../../../types'

type Inputs = z.infer<typeof loginSchema>

export default function SignInForm() {
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const pathname = usePathname()

  const [verifyPayload, setVerifyPayload] = useState<ModalOTPProps['meta']>(
    {} as ModalOTPProps['meta']
  )

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: Inputs) => {
    setLoading(true)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    setLoading(false)

    if (result?.ok) {
      toast.success('Login successfully!')
      router.push('/')
      router.refresh()
    } else {
      toast.error(result?.error)
      if (result?.error?.includes('Your account must be verify')) {
        setVerifyPayload((prev) => ({
          ...prev,
          email: data.email,
          title: 'Verify your account',
        }))

        setModal(true)
      }
    }
  }

  const mutationVerify = useMutation<
    DataResponse,
    DataError,
    OTPPayloadProps,
    unknown
  >({
    mutationFn: confirmOTP,
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success('Verify successfully!')
        setModal(false)
        form.handleSubmit(onSubmit)()
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
        type="REGISTER"
        meta={verifyPayload}
        onSubmit={onSubmitVerify}
        open={modal}
        onClose={() => setModal(false)}
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

          <Button
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white"
          >
            {loading && <Spiner size={20} />}
            Sign in
          </Button>
        </form>
      </Form>
    </>
  )
}
