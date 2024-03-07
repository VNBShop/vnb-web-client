import { ReactNode } from 'react'

import { Session, getServerSession } from 'next-auth'

import Header from '@/common/header'
import ProfileHeader from '@/contents/profile/header'
import { UserContextProvider } from '@/context/user'
import { authOptions } from '@/lib/authOptions'

type UserLayoutProps = {
  children: ReactNode
  params: {
    userId: string
  }
}

export default async function UserProfileLayout({
  children,
  params,
}: UserLayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <UserContextProvider user={session?.user as Session['user']}>
      <div className=" absolute inset-0 flex flex-col">
        <Header />

        <ProfileHeader />

        <section className="flex-1 border border-t bg-gray-100">
          {children}
        </section>
      </div>
    </UserContextProvider>
  )
}
