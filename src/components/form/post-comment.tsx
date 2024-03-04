'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { z } from 'zod'

import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import useCreateComment, {
  CreateCommentPayload,
} from '@/hooks/forum/useCreateComment'
import useKeyPress from '@/hooks/useKeyDown'
import { commentSchema } from '@/lib/validations/product'

import { Post } from '../../../types/forum'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'

type Inputs = z.infer<typeof commentSchema>

type IProps = {
  postId: Post['postId']
}

export default function PostCommentForm({ postId }: IProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(commentSchema),
  })

  const watchCommentForm = useWatch({ control: form.control, name: 'comment' })

  const { loading, onComment } = useCreateComment({
    onSuccess: () => {
      form.reset()
      form.setValue('comment', '')
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!values?.comment && !postId) {
      return
    }
    const payload: CreateCommentPayload = {
      comment: values.comment,
      postId,
    }

    onComment(payload)
  }

  useKeyPress('Enter', () => {
    if (!watchCommentForm || loading) {
      return
    }
    void onSubmit(form.getValues())
  })

  return (
    <Form {...form}>
      <form
        className="flex-1 rounded-md border p-3 pb-0"
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
                  rows={1}
                  maxLength={200}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (loading) return
                      if (!watchCommentForm) return
                    }
                  }}
                  {...field}
                  className="w-full resize-none text-sm focus:outline-none"
                ></textarea>
              </FormItem>
            </FormControl>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <p className="text-xs text-gray-500">
            {watchCommentForm?.length ?? 0}/200
          </p>
          <Button disabled={!watchCommentForm} variant="ghost" className="p-0">
            {!loading ? (
              <Icon
                name="Plane"
                size={22}
                color={!!watchCommentForm ? 'black' : 'gray'}
              />
            ) : (
              <Spiner size={18} />
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
