import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import OtpInput from 'react-otp-input'

import { z } from 'zod'

import Spiner from '@/common/spiner'
import { OTPSchema, resetPasswordSchema } from '@/lib/validations/auth'

import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import InputPassword from './ui/input-password'
import { Modal } from './ui/modal'

export type ModalChangeProps = {
  open: boolean
  onClose?: () => void
  email: string
  onSubmit?: (values: any) => void
  isPending?: boolean
}

type Inputs = z.infer<typeof resetPasswordSchema>

export default function ModalChangePassword({
  open,
  onClose,
  onSubmit,
  isPending,
}: ModalChangeProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <Modal
      show={open}
      close={onClose}
      closeOutside={false}
      size="default"
      title="Verify your account"
    >
      <h3 className="text-lg font-medium">Reset password</h3>

      <p className=" mt-3 text-sm text-gray-600">
        Please reset your password to login
      </p>

      <Form {...form}>
        <form
          className="mt-8 space-y-4"
          onSubmit={form.handleSubmit(onSubmit as SubmitHandler<any>)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} placeholder="Password" />
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
                  <InputPassword {...field} placeholder="Confirm password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="mt-10 flex justify-end">
            <Button
              disabled={isPending}
              type="submit"
              className="flex h-9 items-center gap-2"
            >
              {isPending ? <Spiner size={20} /> : null}
              Confirm
            </Button>
          </section>
        </form>
      </Form>
    </Modal>
  )
}
