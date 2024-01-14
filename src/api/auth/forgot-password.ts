import axios from 'axios'
import { z } from 'zod'

import { forgotPassSchema, signUpSchema } from '@/lib/validations/auth'

import { axiosUser } from '../axios/axiosUser'

export async function forgotPassword(
  payload: z.infer<typeof forgotPassSchema>
) {
  const res = await axiosUser.post(
    '/account/send-otp-mail-reset-password',
    payload
  )
  return res
}

export async function resetPassword(payload: z.infer<typeof signUpSchema>) {
  const res = await axiosUser.post('/account/reset-password', payload)
  return res
}
