import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react'

import { useForm } from 'react-hook-form'

import { Socket } from 'socket.io-client'

import { v4 as uuidv4 } from 'uuid'

import { run } from 'node:test'

import Icon from '@/common/icons'

import { useUserContext } from '@/context/user'
import useKeyPress from '@/hooks/useKeyDown'

import { ChatProps } from '../../../app/(forum)/conversation/[chatId]/page'
import { Chat, ChatCommunicate, ChatResponse } from '../../../types/messenger'
import { User } from '../../../types/user'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'

export type IProps = ComponentPropsWithoutRef<'form'> & {
  setChats: Dispatch<SetStateAction<Chat[]>>
  socket: Socket
  userAccount: User
  receiverId: string | number
  room: ChatResponse['room']
}

type Inputs = {
  chat: string
}

export default function ConversationForm({
  setChats,
  socket,
  userAccount,
  receiverId,
  room,
  ...props
}: IProps) {
  const form = useForm({
    defaultValues: {
      chat: '',
    },
  })

  const user = useUserContext()

  const onSubmit = (values: Inputs) => {
    if (!values?.chat) return
    const payload: ChatCommunicate = {
      content: values?.chat,
      receiverId: receiverId as number,
      room: room,
      senderId: user?.userId,
      isImage: false,
    }

    setChats((prev) => [
      ...prev,
      {
        messageId: uuidv4() as any,
        content: values.chat,
        isImage: false,
        recipientId: receiverId as number,
        senderId: user?.userId,
      },
    ])
    socket?.emit('send_message', payload)

    form.setValue('chat', '')
  }

  useKeyPress('Enter', () => {
    void form.handleSubmit(onSubmit)
  })
  return (
    <Form {...form}>
      <form
        action=""
        className="flex items-center gap-3 px-2 py-1"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        {...props}
      >
        <div className="h-9 w-9 rounded-full p-1 hover:cursor-pointer lg:hover:bg-gray-100">
          <input type="file" className="hidden" id="file" />
          <label
            htmlFor="file"
            className="flex h-full w-full items-center justify-center hover:cursor-pointer"
          >
            <Icon name="Photo" size={20} />
          </label>
        </div>

        <FormField
          name="chat"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <FormItem className="flex-1">
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Aa"
                  className="h-auto flex-1 rounded-full bg-gray-100 p-2 px-3 py-2 text-sm"
                />
              </FormItem>
            </FormControl>
          )}
        />

        {/* <input
          type="text"
          name="chat"
          placeholder="Aa"
          {...form.control}
          className=" focus-within:outline-none"
        /> */}

        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-full p-1 lg:hover:bg-gray-100"
        >
          <Icon name="Plane" size={20} />
        </button>
      </form>
    </Form>
  )
}
