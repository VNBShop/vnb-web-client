import Link from 'next/link'

import Avatar from '@/components/avatar'

export default function ForumSubbar() {
  return (
    <aside className="hidden lg:col-span-1 lg:block">
      <section className=" sticky top-[76px]">
        <h2 className="font-medium">Top users</h2>

        <ul className="mt-4 space-y-2">
          {Array.from('01234', Number).map((_: unknown, index) => (
            <li key={index}>
              <Link
                href="/user/jungjung261"
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Avatar src="/dad.png" username="K" />
                  <p className="text-sm font-medium">Khang Leo</p>
                </div>

                <p className="text-sm">12k</p>
              </Link>
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        <Link
          href="/user/jungjung261"
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <Avatar src="/common/avt.jpeg" username="K" />
            <p className="text-sm font-medium">Dzung payme</p>
          </div>
          <p className="text-sm">09</p>
        </Link>
      </section>
    </aside>
  )
}
