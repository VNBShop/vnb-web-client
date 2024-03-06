'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { z } from 'zod'

import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import useCreateProductCmt, {
  CreateProductCmtPayload,
} from '@/hooks/product/useCreateComment'
import useKeyPress from '@/hooks/useKeyDown'
import { commentSchema } from '@/lib/validations/product'

import { ProductDetail } from '../../../types/products'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'

type Inputs = z.infer<typeof commentSchema>

type IProps = {
  productId: ProductDetail['productId']
}

export default function ProductCommentForm({ productId }: IProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(commentSchema),
  })

  const watchCommentForm = useWatch({ control: form.control, name: 'comment' })

  const { loading, onCreateCmt } = useCreateProductCmt({
    onSuccess: () => {
      form.reset()
      form.setValue('comment', '')
    },
  })

  const onSubmit = (value: Inputs) => {
    if (!productId) return

    const payload: CreateProductCmtPayload = {
      comment: value.comment,
      productId,
    }

    onCreateCmt(payload)
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
        className="max-w-[500px] rounded-md border p-3 pb-0"
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
                      e.preventDefault()

                      if (!watchCommentForm || loading) return
                    }
                  }}
                  {...field}
                  className="w-full resize-none text-sm focus:outline-none"
                ></textarea>
              </FormItem>
            </FormControl>
          )}
        />

        <div className="flex justify-end">
          <Button
            disabled={!watchCommentForm || loading}
            variant="ghost"
            className="p-0"
          >
            {loading ? (
              <Spiner size={20} />
            ) : (
              <Icon
                name="Plane"
                size={22}
                color={!!watchCommentForm ? 'black' : 'gray'}
              />
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
