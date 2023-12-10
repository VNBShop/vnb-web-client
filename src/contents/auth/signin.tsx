'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { loginSchema } from '@/lib/validations/auth'

type Inputs = z.infer<typeof loginSchema>

export default function SignInForm() {
  const [loading, setLoading] = useState(false)

  const session = useSession()

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: Inputs) => {
    setLoading(true)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl: '/'
    })
    setLoading(false)

    if (result?.ok) {
      toast.success('Login successfully!')
      router.push('/')
    } else {
      toast.error('Wrong email or password!')
    }
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

        <Button className="flex items-center gap-2 bg-black text-white">
          {loading && <Spiner size={20} />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}
