import Link from 'next/link'
import { notFound } from 'next/navigation'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ChatAction from '@/contents/conversation/action'
import ChatList from '@/contents/conversation/chat-list'

export type ChatProps = {
  params: {
    chatId: string
  }
}

export default function Chat({ params }: ChatProps) {
  // if (params.chatId === '1') {
  //   return notFound()
  // }
  return (
    <section className="flex h-full flex-col overflow-hidden pb-4">
      <section className="flex items-center justify-between border-b px-2 py-1 pl-1">
        <Link
          href="/user/jungjung261"
          className="flex items-center gap-2 rounded-md p-1 px-2 lg:hover:bg-gray-100"
        >
          <Avatar src="/acom" username="K" />
          <p>{params.chatId}</p>
        </Link>

        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
          <Icon name="I" width={16} height={16} />
        </div>
      </section>

      <ChatList />

      <ChatAction />
    </section>
  )
}
