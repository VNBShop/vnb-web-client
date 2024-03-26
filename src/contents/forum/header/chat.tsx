import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/common/icons'

import { useSocketContext } from '@/context/socket'

import { SocketProps } from '../../../../types/forum'
import { ChatCard } from '../../../../types/messenger'

export default function ChatNoti() {
  const pathname = usePathname()

  const [isNews, setIsNews] = useState(false)

  const socket = useSocketContext()

  useEffect(() => {
    const handleMessageRead = (message: SocketProps<ChatCard>) => {
      if (message?.type === 'CHAT_LIST') {
        setIsNews(true)
      }
    }

    socket?.on('update_list_message', handleMessageRead)

    return () => {
      socket?.off('update_list_message', handleMessageRead)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return !pathname.startsWith('/conversation') ? (
    <Link
      href="/conversation"
      onClick={() => setIsNews(false)}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:cursor-pointer lg:hover:bg-gray-200"
    >
      <Icon name="Plane" size={23} />
      {isNews && (
        <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-success text-[10px] text-white">
          <Icon name="CommentFill" size={8} />
        </div>
      )}
    </Link>
  ) : null
}
