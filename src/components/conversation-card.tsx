import Link from 'next/link'

import Avatar from './avatar'

export default function ConversationCard() {
  return (
    <Link
      href="/conversation/1"
      className="flex items-center gap-2 rounded-md px-2 py-2 lg:hover:bg-gray-100"
    >
      <Avatar src="/common" username="Dzung" className="h-12 w-12" />
      <section className="flex-1">
        <p className="text-sm font-medium">Dzung dep trai</p>
        <div className="flex">
          <p className=" line-clamp-1 text-xs text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <span className="flex-1 text-xs">1h</span>
        </div>
      </section>
    </Link>
  )
}
