import axios from 'axios'

type PayloadProps = {
  otp: string
  email: string
  type: 'REGISTER'
}

export async function confirmOTP(payload: PayloadProps) {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_URL}/account/confirm-otp`,
    payload
  )
  return res
}
