import { z } from 'zod'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0).default(1),
})

export const commentSchema = z.object({
  comment: z.string().max(200),
})

export const orderSchema = z.object({
  fullname: z.string().max(100),
  phone: z.string().regex(phoneRegex, 'Phone number is not valid!'),
  address: z.string().max(120),
  orderType: z.string(),
})
