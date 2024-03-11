'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { io } from 'socket.io-client'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ConversationForm from '@/components/form/conversation'
import ChatList, { ChatListProps } from '@/contents/conversation/chat-list'
import useFetchChat from '@/hooks/chat/useFetchChat'

export type ChatProps = {
  params: {
    chatId: string
  }
}

export default function Chat({ params }: ChatProps) {
  const [chats, setChats] = useState<ChatListProps[]>(chatlists)

  const { data } = useSession()

  const [testTyping, setTyping] = useState(false)

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

  useEffect(() => {
    if (!room) return
    try {
      const socket = io(`${process.env.NEXT_SERVER_API_SOCKET}`, {
        withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${data?.user?.accessToken}`,
        },
        path: '/chat',
        addTrailingSlash: false,
        query: {
          room: room,
        },
        transports: ['websocket', 'polling'],
      })

      socket.on('connect_error', (params) => {
        console.log('socket error >>>', params?.cause)
        // socket.io.opts.transports = ['polling', 'websocket']
      })

      socket.on('connect', () => {
        console.log('Socket connected')
      })

      socket.on('error', (error) => {
        console.error('Socket error:', error)
        // Handle socket errors here
      })

      return () => {
        if (socket) {
          socket.disconnect()
        }
      }
    } catch (error) {
      console.error('Error connecting to socket:', error)
      // Handle connection errors here
    }
  }, [room, data?.user?.accessToken])

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
