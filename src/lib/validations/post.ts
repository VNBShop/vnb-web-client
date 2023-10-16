import { z } from 'zod'

export const AddPostSchema = z.object({
  content: z.string().optional(),
})
