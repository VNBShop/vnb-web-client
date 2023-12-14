import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import OtpInput from 'react-otp-input'

import { z } from 'zod'

import Spiner from '@/common/spiner'
import { OTPSchema } from '@/lib/validations/auth'

import { Button } from './ui/button'
import { Modal } from './ui/modal'

export type ModalOTPProps = {
  open: boolean
  onClose?: () => void
  meta: {
    email: string
    type: 'REGISTER' | 'signup'
    title: string
  }
  onSubmit?: (values: any) => void
  isPending?: boolean
}

type Inputs = z.infer<typeof OTPSchema>

const style = {
  separaStyle: {
    color: 'rgba(22,24,35,0.2)',
  },

  inputStyle: {
    width: '100%',
    height: '40px',
    fontSize: '18px',
    border: '1px solid rgba(22,24,35,0.2)',
    borderRadius: '5px',
    color: 'black',
  },
}

export default function ModalOTP({
  open,
  meta,
  onClose,
  onSubmit,
  isPending,
}: ModalOTPProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: '',
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
      <h3 className="text-lg font-medium">{meta.title}</h3>

      <p className=" mt-3 text-sm text-gray-600">
        We just send an OTP to{' '}
        <span className="font-medium text-secondary">{meta.email}</span>
      </p>

      <form
        className="mt-8"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
      >
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <>
              <OtpInput
                value={value}
                onChange={onChange}
                inputStyle={style.inputStyle}
                numInputs={6}
                renderSeparator={() => (
                  <span className="text-gray-500">&nbsp;-&nbsp;</span>
                )}
                shouldAutoFocus
                renderInput={(props) => <input {...props} />}
              />
              {!!errors?.otp?.message && (
                <p className=" mt-2 text-sm text-red-500">
                  {errors?.otp?.message}
                </p>
              )}
            </>
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
    </Modal>
  )
}
