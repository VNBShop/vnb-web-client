'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signup } from '@/api/auth/signup'
import Spiner from '@/common/spiner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import InputPassword from '@/components/ui/input-password'
import { signUpSchema } from '@/lib/validations/auth'

type Inputs = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    any,
    unknown
  >({
    mutationFn: signup,
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Signup successfully!')
        router.push('/signin')
      }
    },
    onError: (error) => {

      toast.error(error.response.data.metadata.message)
    },
  })

  const onSubmit = (data: Inputs) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="bg-black text-white flex items-center gap-2">
          {isPending && <Spiner size={20} />}
          Continue
        </Button>
      </form>
    </Form>
  )
}
