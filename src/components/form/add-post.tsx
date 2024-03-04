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

type Inputs = z.infer<typeof commentSchema>

export default function AddPostForm() {
  const photosRef = createRef<UploadFileRefProps>()
  const form = useForm<Inputs>({
    resolver: zodResolver(commentSchema),
  })

  const watchCommentForm = useWatch({ control: form.control, name: 'comment' })

  const onSubmit = (value: Inputs) => {
    form.reset()
    form.setValue('comment', '')
  }

  useKeyPress('Enter', () => {
    if (!watchCommentForm) {
      return
    }
    void onSubmit(form.getValues())
  })

  return (
    <Form {...form}>
      <form
        className="mt-5 max-w-[500px] px-2 pb-0"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <FormItem>
                <textarea
                  placeholder="What's on your mind?"
                  rows={4}
                  maxLength={200}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!watchCommentForm) return
                      e.preventDefault()
                    }
                  }}
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

        <Button disabled={!watchCommentForm} className="h-9 w-full">
          Create post
        </Button>
      </form>
    </Form>
  )
}
