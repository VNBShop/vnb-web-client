import axios from 'axios'
import { z } from 'zod'

import { loginSchema } from '@/lib/validations/auth'

import { axiosUser } from '../axios/axiosUser'

export async function login(payload: z.infer<typeof loginSchema>) {
  const res = await axiosUser.post('/account/login', payload)
  return res
}
