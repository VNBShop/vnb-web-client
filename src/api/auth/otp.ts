import axios from 'axios'

import { axiosUser } from '../axios/axiosUser'

export type OTPPayloadProps = {
  otpCode: string
  email: string
  type: 'REGISTER' | 'RESET_PASSWORD'
}

export async function confirmOTP(payload: OTPPayloadProps) {
  const res = await axiosUser.post('/account/confirm-otp', payload)
  return res
}
