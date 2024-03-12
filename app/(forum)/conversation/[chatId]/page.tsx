'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Socket, io } from 'socket.io-client'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ConversationForm from '@/components/form/conversation'
import ChatList from '@/contents/conversation/chat-list'
import { useUserContext } from '@/context/user'
import useFetchChat from '@/hooks/chat/useFetchChat'

import useSocketChat from '@/hooks/chat/useSocketChat'

import { Chat } from '../../../../types/messenger'

export type ChatProps = {
  params: {
    chatId: string
  }
}

export default function Chat({ params }: ChatProps) {
  const [chats, setChats] = useState<Chat[]>([])

  const user = useUserContext()

  const router = useRouter()

  const {
    room,
    messages,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
  } = useFetchChat({
    chatId: params?.chatId,
  })

  const socket = useSocketChat({ room: room as string })

  useEffect(() => {
    if (JSON.stringify(messages) !== JSON.stringify(chats)) {
      setChats(messages)
    }
  }, [chats, messages])

  return (
    <section className="flex h-full flex-col overflow-hidden pb-4">
      <section className="flex items-center justify-between border-b px-2 py-1 pl-2">
        <div className="flex items-center gap-2">
          <div className="lg:hidden" onClick={() => router.back()}>
            <Icon name="ChevronLeft" size={23} />
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
          <Icon name="I" size={16} />
        </div>
      </section>

      <ChatList chats={chats} />

      <ConversationForm setChats={setChats} socket={socket as Socket} />
    </section>
  )
}
