import axios from 'axios'
import { z } from 'zod'

import { loginSchema } from '@/lib/validations/auth'

export async function login(payload: z.infer<typeof loginSchema>) {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_URL}/account/login`,
    payload
  )
  return res
}
