import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { toast } from 'sonner'
import { z } from 'zod'

import { useModal } from '@/_store/useModal'
import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import { Modal } from '@/components/ui/modal'
import { changePasswordSchema } from '@/lib/validations/auth'

import { DataError, DataResponse } from '../../../types'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import InputPassword from '../ui/input-password'

type Inputs = z.infer<typeof changePasswordSchema>
export default function ModalChangePassword() {
  const axios = useAxiosPrivate()

  const { modalChangePassword, setModal } = useModal((state) => state)

  const form = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const axiosPrivate = useAxiosPrivate()

  const { isPending, mutate } = useMutation<
    DataResponse,
    DataError,
    Inputs,
    unknown
  >({
    mutationFn: (payload) => {
      const res = axiosPrivate.put(
        `user-service/api/v1/account/change-password`,
        payload
      )
      return res
    },
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Change password successfully!')
        setModal('modalChangePassword')
      }
    },
    onError: (error) => {
      toast.error(error.response.data.metadata.message)
    },
  })

  const onSubmit = (values: Inputs) => {
    mutate(values)
  }

  return (
    <>
      <Modal
        show={modalChangePassword}
        closeOutside
        close={() => setModal('modalChangePassword')}
      >
        <section className="flex items-center justify-between">
          <div
            className="hover:cursor-pointer"
            onClick={() => setModal('modalChangePassword')}
          >
            <Icon name="ChevronLeftThin" width={22} height={22} />
          </div>
          <h2 className="text-lg font-medium">Change password</h2>
          <span>&nbsp;</span>
        </section>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-7 space-y-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputPassword {...field} placeholder="Current password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputPassword {...field} placeholder="New password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Retype new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Link href={'/reset-password'} className="group">
                <span className=" text-sm text-secondary group-hover:underline">
                  Forgot password?
                </span>
              </Link>
            </div>

            <section className="!mt-7 flex justify-end gap-1">
              <Button
                disabled={isPending}
                type="button"
                className="group h-10"
                variant="ghost"
              >
                <span className=" group-hover:underline">Cancel</span>
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                className="flex h-10 items-center gap-2"
              >
                {isPending && <Spiner size={18} />}
                Change password
              </Button>
            </section>
          </form>
        </Form>
      </Modal>
    </>
  )
}
