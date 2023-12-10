import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100)
      .refine(
        (value) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value
          ),
        'Password must be at least one special character, number and uppercase letter'
      ),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

export const loginSchema = z.object({
  email: z.string().nonempty({
    message: 'Please enter emaill address'
  }).email({
    message: 'Please enter a valid email address'
  }),
  password: z.string().nonempty({
    message: 'Please enter password'
  })
})
