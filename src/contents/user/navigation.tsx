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
    <ul className="mt-8 -ml-4 flex items-center gap-1">
      {user_navigation.map((item, index) => (
        <li key={index}>
          <Link
            href={`/user/${userId}${item.url}`}
            className="p-4 text-sm font-medium text-gray-600 rounded-md lg:hover:bg-gray-100 relative"
          >
            {item.label}
            {pathname === `/user/${userId}${item.url}` ? (
              <div className=" absolute bottom-0 inset-x-0 w-full h-[3px] bg-secondary rounded-full" />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
