import axios from 'axios'
import { z } from 'zod'

import { signUpSchema } from '@/lib/validations/auth'

import { axiosUser } from '../axios/axiosUser'

export async function signup(payload: z.infer<typeof signUpSchema>) {
  const res = await axiosUser.post('/account/signup', payload)
  return res
}
