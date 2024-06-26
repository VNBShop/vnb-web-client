'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { user_navigation } from '@/data'
import { cn } from '@/lib/utils'

export type UserNavigationProps = {
  userId: string
}

export default function UserNavigation({ userId }: UserNavigationProps) {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-1 px-4 md:-ml-4 lg:px-0">
      {user_navigation.map((item, index) => (
        <li key={index}>
          <Link
            href={`${item.url}`}
            className={cn(
              'relative inline-block rounded-md p-4 text-sm font-medium text-gray-600 lg:hover:bg-gray-100',
              pathname === item.url ? 'text-secondary' : ''
            )}
          >
            {item.label}
            {pathname === item?.url ? (
              <div className=" absolute inset-x-0 bottom-0 h-[3px] w-full rounded-full bg-secondary" />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
