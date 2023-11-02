import Icon from '@/common/icons'
import Avatar from '@/components/avatar'

import ConversationList from './conversation-list'
import ConversationSearch from './search'

export default function ConversationSidebar() {
  return (
    <aside className="col-span-[25%] flex h-full flex-col space-y-2 overflow-hidden border-r p-2 pb-4">
      <h1 className="ml-2 py-[6px] text-lg font-medium">Conversation</h1>
      <ConversationSearch />
      <ConversationList />

      <div className="flex w-full items-center justify-between rounded-md border-t px-2 py-1 hover:cursor-pointer lg:hover:bg-gray-100">
        <article className="flex items-center gap-2">
          <Avatar src="/common/avt.jpeg" username="Dzung payme" />
          <p className="flex-1 text-sm font-medium">Dzung payme</p>
        </article>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
          <Icon name="Logout" width={18} height={18} />
        </div>
      </div>
    </aside>
  )
}
