'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { user_navigation } from '@/data'

export type UserNavigationProps = {
  userId: string
}

export default function UserNavigation({ userId }: UserNavigationProps) {
  const pathname = usePathname()

  return (
    <ul className="-ml-4 flex items-center gap-1">
      {user_navigation.map((item, index) => (
        <li key={index}>
          <Link
            href={`/user/${userId}${item.url}`}
            className="relative inline-block rounded-md p-4 text-sm font-medium text-gray-600 lg:hover:bg-gray-100"
          >
            {item.label}
            {pathname === `/user/${userId}${item.url}` ? (
              <div className=" absolute inset-x-0 bottom-0 h-[3px] w-full rounded-full bg-secondary" />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
