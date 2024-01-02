import Image from 'next/image'

import Link from 'next/link'

import Avatar from '@/components/avatar'

export default function ForumSideBar() {
  return (
    <aside className="col-span-1 hidden lg:col-span-1 lg:block">
      <ul className="sticky top-[76px] space-y-4">
        <li>
          <Link href="/user/jungjung261" className="flex items-center gap-3">
            <Avatar src="/common/avt.jpeg" username="D" />
            <h3 className="text-sm font-medium">Dzung payme</h3>
          </Link>
        </li>

        <li>
          <Link href="forum/saved" className="flex items-center gap-3">
            <Image
              src="/forum/bookmark.png"
              alt="bookmark"
              width={36}
              height={36}
            />
            <h3 className="text-sm font-medium">Saved</h3>
          </Link>
        </li>

        <li>
          <hr className="my-4 mt-7" />
          {/* Ads */}
          <section className="mt-4">
            <figure className="flex w-full items-center justify-center">
              <Image
                src="/forum/banner-sale.png"
                alt="banner"
                width="0"
                height="0"
                className="w-[100px]"
                sizes="100vw"
              />
            </figure>
            <p className="text-center text-lg font-semibold">VNB SUPPER sale</p>
            <h4 className="mt-2 bg-messenger bg-clip-text text-center text-3xl font-bold text-transparent">
              UPTO 70%
            </h4>
            <Link
              href="/"
              className=" mt-5 inline-flex w-full items-center justify-center rounded-md bg-black py-3 text-sm font-medium text-white"
            >
              Buying now
            </Link>
          </section>
        </li>
      </ul>
    </aside>
  )
}
