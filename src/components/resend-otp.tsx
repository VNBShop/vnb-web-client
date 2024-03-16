import { useEffect, useState } from 'react'

import Spiner from '@/common/spiner'
import useResendOTP, { ResendOTPPayload } from '@/hooks/user/useResendOTP'

type IProps = {
  type: 'REGISTER' | 'RESET_PASSWORD'
  email: string
}

export default function ResendOTP({ email, type }: IProps) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(60)

  const { loading, onResendOTP } = useResendOTP({
    onSuccess: () => {
      setMinutes(0)
      setSeconds(60)
    },
  })

  const onResend = () => {
    const payload: ResendOTPPayload = {
      email,
      type,
    }

    onResendOTP(payload)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds, minutes])

  return (
    <section className="my-4">
      {seconds > 0 || minutes > 0 ? (
        <p className="text-sm text-gray-500">
          OTP remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p className="flex items-center text-sm text-gray-500">
          Didn&apos;t recieve code?
          <button
            onClick={onResend}
            disabled={loading}
            className="ml-2 font-medium text-secondary lg:hover:underline"
          >
            {loading ? <Spiner size={16} /> : ' Resend'}
          </button>
        </p>
      )}
    </section>
  )
}
