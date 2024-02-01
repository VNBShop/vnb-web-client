import Link from 'next/link'

import Avatar from './avatar'

export default function ConversationCard() {
  return (
    <Link
      href="/conversation/1"
      className="flex items-center gap-2 rounded-md px-2 py-[5px] lg:hover:bg-gray-100"
    >
      <Avatar src="/common" username="Dzung" className="h-12 w-12" />
      <section className="flex-1">
        <p className="text-sm font-medium">Dzung dep trai</p>
        <div className="flex">
          <p className=" line-clamp-1 flex-1 text-xs text-gray-600">
            Lorem Ipsum
          </p>
          <span className="text-xs">1h</span>
        </div>
      </section>
    </Link>
  )
}
