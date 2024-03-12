import { Dispatch, SetStateAction } from 'react'

import { useForm } from 'react-hook-form'

import { Socket } from 'socket.io-client'

import Icon from '@/common/icons'

import useKeyPress from '@/hooks/useKeyDown'

import { Chat } from '../../../types/messenger'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'

export type IProps = {
  setChats: Dispatch<SetStateAction<Chat[]>>
  socket: Socket
}

type Inputs = {
  chat: string
}

export default function ConversationForm({ setChats, socket }: IProps) {
  const form = useForm({
    defaultValues: {
      chat: '',
    },
  })

  const onSubmit = (values: Inputs) => {
    setChats((prev) => [
      ...prev,
      {
        sender: 1,
        receiver: 2,
        content: values?.chat,
      },
    ])
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
                  onKeyDown={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
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

        <button className="flex h-9 w-9 items-center justify-center rounded-full p-1 lg:hover:bg-gray-100">
          <Icon name="Plane" size={20} />
        </button>
      </form>
    </Form>
  )
}
