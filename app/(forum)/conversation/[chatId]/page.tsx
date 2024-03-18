'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import { notFound, useRouter } from 'next/navigation'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ConversationForm from '@/components/form/conversation'
import ChatSkeleton from '@/components/skeletons/chat-skeleton'
import ChatList from '@/contents/conversation/chat-list'
import { useSocketContext } from '@/context/socket'
import useFetchChat from '@/hooks/chat/useFetchChat'

import useFetchUserAcc from '@/hooks/user/useFetchUserAcc'

import { cn } from '@/lib/utils'

import { SocketProps } from '../../../../types/forum'
import { Chat } from '../../../../types/messenger'
import { User } from '../../../../types/user'

export type ChatProps = {
  params: {
    chatId: string
  }
}

export default function Chat({ params }: ChatProps) {
  const router = useRouter()

  const {
    room,
    chats,
    hasNextPage,
    onFetchNextPage,
    isError,
    isPending,
    setChats,
  } = useFetchChat({
    chatId: params?.chatId,
  })

  const {
    loading,
    userAccount,
    isError: isErrorFetchUser,
  } = useFetchUserAcc({
    userId: params?.chatId,
  })

  const socket = useSocketContext()

  useEffect(() => {
    const handleMessageRead = (message: SocketProps<Chat>) => {
      if (message?.type === 'CHAT') {
        setChats((prevChats) => [...prevChats, message?.data])
      }
    }

    socket?.on('receive_message', handleMessageRead)

    return () => {
      socket?.off('receive_message', handleMessageRead)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  if (isErrorFetchUser || isError) {
    return notFound()
  }

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
              href={`/user/${params?.chatId}`}
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
      </section>

      {!isError && isPending && !chats?.length && <ChatSkeleton />}

      {(isError || !chats?.length) && !isPending && (
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

      {!!chats?.length && !isError && (
        <ChatList
          userAccount={userAccount as User}
          hasNextPage={hasNextPage as boolean}
          loading={isPending}
          chats={chats}
          onFetchNextPage={onFetchNextPage}
        />
      )}

      <ConversationForm
        className={cn(isPending ? 'invisible' : 'flex')}
        setChats={setChats}
        userAccount={userAccount as User}
        receiverId={params?.chatId}
        room={room as string}
      />
    </section>
  )
}
