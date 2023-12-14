import Image from 'next/image'
import Link from 'next/link'

import { getServerSession } from 'next-auth'

import { Session } from 'next-auth'

import { authOptions } from '@/lib/authOptions'

import Nav from './nav'
import Search from './search'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <div className="sticky left-0 right-0 top-0 z-10 border bg-white">
      <header className="mx-auto flex max-w-main items-center justify-between px-4 py-2">
        <section className="flex items-center gap-4">
          <Link href="/">
            <figure>
              <Image
                src="/common/icon.png"
                alt="logo"
                title="logo"
                sizes="100vw"
                width={40}
                height={40}
              />
            </figure>
          </Link>
          <Search />
        </section>

        <section className="flex items-center gap-2">
          <Nav user={session?.user as Session['user']} />
        </section>
      </header>
    </div>
  )
}
