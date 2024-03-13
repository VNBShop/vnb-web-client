import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import Header from '@/common/header'
import UserOutProfile from '@/contents/profile/user-out'
import { authOptions } from '@/lib/authOptions'

type IProps = {
  params: {
    userId: string
  }
}

export default async function UserProfilePage({ params: { userId } }: IProps) {
  const session = await getServerSession(authOptions)

  if (session?.user?.userId?.toString() === userId) {
    return redirect('/profile')
  }
  return (
    <>
      <Header />
      <UserOutProfile userId={userId} />
    </>
  )
}
