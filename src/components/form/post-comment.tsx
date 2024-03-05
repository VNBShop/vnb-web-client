'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { z } from 'zod'

import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import useCreateComment, {
  CreateCommentPayload,
} from '@/hooks/forum/useCreateComment'
import useEditComment, {
  EditCommentPayload,
} from '@/hooks/forum/useEditComment'
import useKeyPress from '@/hooks/useKeyDown'
import { commentSchema } from '@/lib/validations/product'

import { Comment, Post } from '../../../types/forum'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'

type Inputs = z.infer<typeof commentSchema>

type IProps = {
  commentId?: Comment['commentId']
  commented?: string
  onClose?: () => void
}

export default function PostCommentForm({
  commentId,
  commented,
  onClose,
}: IProps = {}) {
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

  const { loading: loadingEdit, onEditComment } = useEditComment({
    onSuccess: () => {
      onClose?.()
      form.reset()
      form.setValue('comment', '')
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!values?.comment) {
      return
    }
    const payload: CreateCommentPayload = {
      comment: values.comment,
    }

    const payloadEdit: EditCommentPayload = {
      comment: values?.comment,
      commentId: commentId as number,
    }

    if (!!commentId) {
      onEditComment(payloadEdit)
    } else {
      onComment(payload)
    }
  }

  useKeyPress('Enter', () => {
    if (!watchCommentForm || loading || loadingEdit) {
      return
    }
    void onSubmit(form.getValues())
  })

  useEffect(() => {
    if (!!commentId && !!commented) {
      form.setValue('comment', commented ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commented, commentId])

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
                      if (loading || loadingEdit) return
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
          <Button
            disabled={!watchCommentForm || loading || loadingEdit}
            variant="ghost"
            className="p-0"
          >
            {!loading || !loadingEdit ? (
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
