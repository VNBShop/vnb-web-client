import Image from 'next/image'

import Link from 'next/link'

import Avatar from '@/components/avatar'

export default function ForumSideBar() {
  return (
    <aside className="col-span-1 hidden lg:col-span-1 lg:block">
      <ul className="sticky top-[76px] space-y-4">
        <li>
          <Link href="/user/jungjung261" className="flex items-center gap-3">
            <Avatar src="/common/avt.jpeg" username="D" />
            <h3 className="text-sm font-medium">Dzung payme</h3>
          </Link>
        </li>

        <li>
          <Link href="forum/saved" className="flex items-center gap-3">
            <Image
              src="/forum/bookmark.png"
              alt="bookmark"
              width={36}
              height={36}
            />
            <h3 className="text-sm font-medium">Saved</h3>
          </Link>
        </li>
      </ul>
    </aside>
  )
}
