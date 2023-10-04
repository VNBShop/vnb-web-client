import Image from 'next/image'
import Link from 'next/link'
import Search from './search'
import Nav from './nav'

export default function Header() {
  return (
    <div className="border sticky top-0 left-0 right-0 z-10 bg-white">
      <header className="max-w-main mx-auto flex items-center justify-between px-4 py-2">
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
          <Nav />
        </section>
      </header>
    </div>
  )
}
