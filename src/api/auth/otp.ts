import axios from 'axios'

export type OTPPayloadProps = {
  otpCode: string
  email: string
  type: 'REGISTER' | 'RESET_PASSWORD'
}

export async function confirmOTP(payload: OTPPayloadProps) {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_URL}/account/confirm-otp`,
    payload
  )
  return res
}
