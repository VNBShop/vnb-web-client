import { PropsWithChildren, ReactNode } from 'react'

import Header from '@/common/header'
import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import { Button } from '@/components/ui/button'
import ProfileHeader from '@/contents/user/header'
import UserNavigation from '@/contents/user/navigation'

type UserLayoutProps = {
  children: ReactNode
  params: {
    userId: string
  }
}

export default function UserProfileLayout({
  children,
  params,
}: UserLayoutProps) {
  return (
    <div className=" absolute inset-0 flex flex-col">
      <Header />

      <ProfileHeader />

      <section className="flex-1 border border-t bg-gray-100">
        {children}
      </section>
    </div>
  )
}
