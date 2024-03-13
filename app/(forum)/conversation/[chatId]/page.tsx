'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Socket, io } from 'socket.io-client'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ConversationForm from '@/components/form/conversation'
import ChatSkeleton from '@/components/skeletons/chat-skeleton'
import ChatList from '@/contents/conversation/chat-list'
import { useUserContext } from '@/context/user'
import useFetchChat from '@/hooks/chat/useFetchChat'

import useSocketChat from '@/hooks/chat/useSocketChat'

import useFetchUserAcc from '@/hooks/user/useFetchUserAcc'

import { cn } from '@/lib/utils'

import { Chat } from '../../../../types/messenger'
import { Account } from '../../../../types/user'

export type ChatProps = {
  params: {
    chatId: string
  }
}

export default function Chat({ params }: ChatProps) {
  const [chats, setChats] = useState<Chat[]>([])

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

  const { loading, userAccount } = useFetchUserAcc({
    userId: params?.chatId,
  })

  const socket = useSocketChat({ room: room as string })

  socket?.on('read_message', (message: Chat) => {
    console.log('message', message)
    // setChats(prev => [
    //   ...prev,
    //   {

    //   }
    // ])
  })

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
          {loading ? (
            <div className=" flex animate-pulse items-center gap-2 rounded-md p-1 px-2 lg:hover:bg-gray-100">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="h-4 w-[100px] rounded-full bg-gray-200"></div>
            </div>
          ) : (
            <Link
              href="/user/jungjung261"
              className="flex items-center gap-2 rounded-md p-1 px-2 lg:hover:bg-gray-100"
            >
              <Avatar
                src={userAccount?.avatar ?? ''}
                username={
                  userAccount?.firstName ??
                  userAccount?.lastName ??
                  userAccount?.email ??
                  'Z'
                }
              />
              <p className="text-sm font-medium">
                {userAccount?.firstName || userAccount?.lastName
                  ? `${userAccount?.firstName} ${userAccount?.lastName}`
                  : userAccount?.email}
              </p>
            </Link>
          )}
        </div>

        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
          <Icon name="I" size={16} />
        </div>
      </section>

      {!isError && (isFetchingNextPage || isPending) && <ChatSkeleton />}

      {!!chats?.length && !isError && <ChatList chats={chats} />}

      {(isError || !chats?.length) && !isFetchingNextPage && !isPending && (
        <section className="-mt-16 flex flex-1 flex-col items-center justify-center gap-2">
          <Avatar
            src={userAccount?.avatar ?? ''}
            className="h-[60px] w-[60px]"
            username={
              userAccount?.firstName ??
              userAccount?.lastName ??
              userAccount?.email ??
              'Z'
            }
          />

          <p className="text-lg font-medium">
            {userAccount?.firstName || userAccount?.lastName
              ? `${userAccount?.firstName} ${userAccount?.lastName}`
              : userAccount?.email}
          </p>

          <p className="text-sm text-gray-500">Let&apos; start conversation!</p>
        </section>
      )}

      <ConversationForm
        className={cn(isPending ? 'invisible' : 'flex')}
        setChats={setChats}
        socket={socket as Socket}
        userAccount={userAccount as Account}
        receiverId={params?.chatId}
        room={room as string}
      />
    </section>
  )
}
