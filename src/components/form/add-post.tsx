'use client'

import { createRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { toast } from 'sonner'
import { z } from 'zod'

import Spiner from '@/common/spiner'
import useCreatePost, { CreatePostPayload } from '@/hooks/forum/useCreatePost'
import useKeyPress from '@/hooks/useKeyDown'
import { commentSchema } from '@/lib/validations/product'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import UploadFile, { UploadFileRefProps } from '../ui/upload-file'

type Inputs = {
  content: string
}

type IProps = {
  onCloseModal: () => void
  pageKey: string
}

export default function AddPostForm({ onCloseModal, pageKey }: IProps) {
  const photosRef = createRef<UploadFileRefProps>()
  const form = useForm<Inputs>()

  const { loading, onCreatePost } = useCreatePost({
    onSuccess: () => {
      form.reset()
      form.setValue('content', '')
      onCloseModal()
    },
    pageKey,
  })

  const onSubmit = (values: Inputs) => {
    const photos = !!photosRef?.current ? photosRef.current.images : []

    if (!photos?.length && !values?.content) {
      toast.error('Please fill in form!')
      return
    }

    const createPayload: CreatePostPayload = {
      content: values.content,
      postAssets: photos?.map((photo) => ({
        assetId: photo?.productAssetId,
        secureUrl: photo?.productAssetUrl,
      })),
    }

    onCreatePost(createPayload)
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

        <Button disabled={loading} className="h-10 w-full space-x-1">
          {loading && <Spiner size={16} />}
          <span>Create post</span>
        </Button>
      </form>
    </Form>
  )
}
