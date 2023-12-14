import axios from 'axios'
import { z } from 'zod'

import { forgotPassSchema, signUpSchema } from '@/lib/validations/auth'

export async function forgotPassword(
  payload: z.infer<typeof forgotPassSchema>
) {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_URL}/account/send-otp-mail-reset-password`,
    payload
  )
  return res
}

export async function resetPassword(payload: z.infer<typeof signUpSchema>) {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_URL}/account/reset-password`,
    payload
  )
  return res
}
