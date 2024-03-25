'use client'

import Link from 'next/link'

import Avatar from '@/components/avatar'
import useFetchTopUsers from '@/hooks/forum/useFetchTopUsers'

export default function ForumSubbar() {
  const { loading, topUsers } = useFetchTopUsers()

  return (
    <aside className="hidden lg:col-span-1 lg:block">
      <section className=" sticky top-[76px]">
        <h2 className="font-medium">Top users</h2>

        <ul className="mt-4 space-y-2">
          {!!topUsers?.length
            ? topUsers.map((user, index) => (
                <li key={user?.userId}>
                  <Link
                    href={`/user/${user?.userId}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={user?.avatar ?? ''}
                        username={user?.fullName}
                      />
                      <p className="text-sm font-medium">{user?.fullName}</p>
                    </div>

                    <p className="text-sm">{user?.totalPosts}</p>
                  </Link>
                </li>
              ))
            : !loading && (
                <p className="text-center text-sm text-gray-500">
                  No top users!
                </p>
              )}

          {loading && !topUsers?.length && (
            <section className="mt-2 animate-pulse space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-[140px] rounded-full bg-gray-200"></div>
                </div>
              ))}
            </section>
          )}
        </ul>

        {/* <hr className="my-4" />

        <Link
          href="/user/jungjung261"
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <Avatar src="/common/avt.jpeg" username="K" />
            <p className="text-sm font-medium">Dzung payme</p>
          </div>
          <p className="text-sm">09</p>
        </Link> */}
      </section>
    </aside>
  )
}
