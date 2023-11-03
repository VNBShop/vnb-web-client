'use client'
import { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ConversationForm from '@/components/form/conversation'
import ChatList, { ChatListProps } from '@/contents/conversation/chat-list'

export type ChatProps = {
  params: {
    chatId: string
  }
}

export default function Chat({ params }: ChatProps) {
  // if (params.chatId === '1') {
  //   return notFound()
  // }
  const [chats, setChats] = useState<ChatListProps[]>(chatlists)

  const [testTyping, setTyping] = useState(false)

  const router = useRouter()

  return (
    <section className="flex h-full flex-col overflow-hidden pb-4">
      <section className="flex items-center justify-between border-b px-2 py-1 pl-2">
        <div className="flex items-center gap-2">
          <div className="lg:hidden" onClick={() => router.back()}>
            <Icon name="ChevronLeft" width={23} height={23} />
          </div>
          <Link
            href="/user/jungjung261"
            className="flex items-center gap-2 rounded-md p-1 px-2 lg:hover:bg-gray-100"
          >
            <Avatar src="/acom" username="K" />
            <p>{params.chatId}</p>
          </Link>
        </div>

        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
          <Icon name="I" width={16} height={16} />
        </div>
      </section>

      <ChatList isTyping={testTyping} chats={chats} />

      <ConversationForm setTyping={setTyping} setChats={setChats} />
    </section>
  )
}

const chatlists = [
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content: 'Dzung',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]
