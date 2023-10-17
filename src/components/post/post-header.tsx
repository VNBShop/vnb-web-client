import Icon from '@/common/icons'

import Avatar from '../avatar'

export default function PostHeader() {
  return (
    <header className="flex items-center justify-between px-4">
      <section className="flex gap-2">
        <Avatar src="/common/avt.jpeg" username="D" />
        <div>
          <p className="text-sm font-medium">Dzung</p>
          <p className="text-xs font-light">@jungjung261</p>
        </div>
      </section>

      <div className="flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer lg:hover:bg-gray-100">
        <Icon name="Ellipsis" width={20} height={20} />
      </div>
    </header>
  )
}
