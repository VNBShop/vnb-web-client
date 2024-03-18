import { useEffect } from 'react'

import { useInView } from 'react-intersection-observer'

import ConversationCard from '@/components/conversation-card'
import MessCardSkeleton from '@/components/skeletons/mess-card-skeleton'
import { useSocketContext } from '@/context/socket'
import useFetchChats from '@/hooks/chat/useFetchChats'

import { SocketProps } from '../../../types/forum'
import { ChatCard } from '../../../types/messenger'

export default function ConversationList() {
  const {
    hasNextPage,
    isError,
    isPending,
    onFetchNextPage,
    setMessages,
    messages,
  } = useFetchChats()

  const socket = useSocketContext()

  const { ref, inView } = useInView({
    delay: 1300,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      onFetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  useEffect(() => {
    const handleMessageRead = (message: SocketProps<ChatCard>) => {
      console.log('message message', message)

      if (message?.type === 'CHAT_LIST') {
        setMessages((prevChats) => {
          const findIndex = prevChats?.findIndex(
            (i) => i?.receiverId === message?.data?.receiverId
          )

          if (findIndex !== -1) {
            const newMess = prevChats?.filter(
              (i) => i?.receiverId !== message?.data?.receiverId
            )

            return [message?.data, ...newMess]
          }

          return [message?.data, ...prevChats]
        })
      }
    }

    socket?.on('update_list_message', handleMessageRead)

    return () => {
      socket?.off('update_list_message', handleMessageRead)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <ul className="w-full flex-1 space-y-[6px] overflow-auto">
      {!isError &&
        !!messages?.length &&
        messages.map((mess, index) => (
          <li key={mess.receiverId}>
            <ConversationCard setMessages={setMessages} chat={mess} />
          </li>
        ))}

      {isPending && <MessCardSkeleton />}

      {(isError || !messages?.length) && !isPending && (
        <p className="mt-6 text-center text-sm text-gray-500">
          You has no messeges yet
        </p>
      )}

      {!isError && !isPending && hasNextPage && <div ref={ref}></div>}
    </ul>
  )
}
