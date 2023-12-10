import axios from 'axios'
import { z } from 'zod'

import { signUpSchema } from '@/lib/validations/auth'

export async function signup(payload: z.infer<typeof signUpSchema>) {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_URL}/account/signup`,
    payload
  )
  return res
}
