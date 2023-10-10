'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { z } from 'zod'

import Icon from '@/common/icons'
import useKeyPress from '@/hooks/useKeyDown'
import { commentSchema } from '@/lib/validations/product'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'

type Inputs = z.infer<typeof commentSchema>

export default function CommentForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(commentSchema),
  })

  const watchCommentForm = useWatch({ control: form.control, name: 'comment' })

  const onSubmit = (value: Inputs) => {
    console.log('value', value)

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
        className="max-w-[500px] border rounded-md p-3 pb-0"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <FormItem>
                <textarea
                  placeholder="Write a comment..."
                  cols={30}
                  maxLength={200}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!watchCommentForm) return
                      e.preventDefault()
                    }
                  }}
                  {...field}
                  className="text-sm w-full focus:outline-none resize-none"
                ></textarea>
              </FormItem>
            </FormControl>
          )}
        />

        <div className="flex justify-end">
          <Button disabled={!watchCommentForm} variant="ghost" className="p-0">
            <Icon
              name="Plane"
              width={22}
              height={22}
              color={!!watchCommentForm ? 'black' : 'gray'}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
