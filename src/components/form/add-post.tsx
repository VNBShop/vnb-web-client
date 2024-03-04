'use client'

import { createRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { z } from 'zod'

import useKeyPress from '@/hooks/useKeyDown'
import { commentSchema } from '@/lib/validations/product'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import UploadFile, { UploadFileRefProps } from '../ui/upload-file'

type Inputs = {
  content: string
}

const tags = [
  {
    label: 'Racket',
  },
]

export default function AddPostForm() {
  const photosRef = createRef<UploadFileRefProps>()
  const form = useForm<Inputs>({
    resolver: zodResolver(commentSchema),
  })

  const onSubmit = (values: Inputs) => {
    const photos = !!photosRef?.current ? photosRef.current.images : []

    if (!values?.content) form.reset()
    form.setValue('content', '')
  }

  return (
    <Form {...form}>
      <form
        className="mt-5 max-w-[500px] px-2 pb-0"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <FormItem>
                <textarea
                  placeholder="What's on your mind?"
                  rows={4}
                  maxLength={200}
                  {...field}
                  className="w-full resize-none text-sm focus:outline-none"
                ></textarea>
              </FormItem>
            </FormControl>
          )}
        />

        <div className="my-4">
          <UploadFile ref={photosRef} />
        </div>

        <Button className="h-9 w-full">Create post</Button>
      </form>
    </Form>
  )
}
