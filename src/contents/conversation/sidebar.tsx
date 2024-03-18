'use client'
import { usePathname } from 'next/navigation'

import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import Avatar from '@/components/avatar'

import useSignout from '@/hooks/commons/useSignout'

import ConversationList from './conversation-list'
import ConversationSearch from './search'

export default function ConversationSidebar() {
  const pathname = usePathname()

  const { isPending, onSignOut } = useSignout()

  return (
    <aside
      className={`lg:col-span-[25%] col-span-1 flex h-full flex-col space-y-2 overflow-hidden border-r p-2 pb-4 ${
        pathname.startsWith('/conversation/') ? 'hidden lg:flex' : ''
      }`}
    >
      <h1 className="ml-2 py-[6px] text-lg font-medium">Conversation</h1>
      <ConversationSearch />
      <ConversationList />

      <div
        onClick={() => {
          if (!isPending) {
            onSignOut({})
          }
        }}
        className="flex w-full items-center justify-between border-t px-2 py-1 hover:cursor-pointer hover:rounded-md lg:hover:bg-gray-100"
      >
        <article className="flex items-center gap-2">
          <Avatar src="/common/avt.jpeg" username="Dzung payme" />
          <p className="flex-1 text-sm font-medium">Dzung payme</p>
        </article>

        {isPending ? (
          <Spiner size={16} />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            <Icon name="Logout" size={18} />
          </div>
        )}
      </div>
    </aside>
  )
}
