import { useEffect, useState } from 'react'

import Spiner from '@/common/spiner'

export default function ResendOTP() {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(30)

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
          <button className="ml-2 font-medium text-secondary lg:hover:underline">
            <Spiner size={16} />
            {/* Resend */}
          </button>
        </p>
      )}
    </section>
  )
}
