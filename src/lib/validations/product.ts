import { z } from 'zod'

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0).default(1),
})

export const commentSchema = z.object({
  comment: z.string().max(200),
})
