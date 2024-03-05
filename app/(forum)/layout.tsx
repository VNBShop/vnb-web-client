import { Session, getServerSession } from 'next-auth'

import ForumHeader from '@/contents/forum/header'
import { UserContextProvider } from '@/context/user'
import { authOptions } from '@/lib/authOptions'

export default async function ForumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <UserContextProvider user={session?.user as Session['user']}>
      <ForumHeader />
      <main className="pt-[56px]"> {children}</main>
    </UserContextProvider>
  )
}
