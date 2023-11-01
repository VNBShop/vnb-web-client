import Image from 'next/image'

import Link from 'next/link'

import Icon from '@/common/icons'

import Avatar from '@/components/avatar'

import ForumSearch from './search'

export default function ForumHeader() {
  return (
    <header className="fixed inset-x-0 top-0  z-10 bg-white shadow-sm">
      <section className="mx-auto flex max-w-main items-center  justify-between px-4">
        <section className="flex items-center gap-2">
          <Link href="/forum">
            <figure className="-ml-[10px] h-14 w-14">
              <Image
                src="/common/icon-forum.svg"
                alt="icon forum"
                width="0"
                height="0"
                priority
                className="h-full w-full"
              />
            </figure>
          </Link>
          <ForumSearch />
        </section>

        <section className="flex items-center gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:cursor-pointer lg:hover:bg-gray-200">
            <Icon name="Bell" width={23} height={23} />
            <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
              12
            </div>
          </div>

          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:cursor-pointer lg:hover:bg-gray-200">
            <Icon name="Plane" width={23} height={23} />
            <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
              12
            </div>
          </div>

          <div className="relative h-10 w-10 rounded-full hover:cursor-pointer ">
            <Avatar username="Dung" src="/common/avt.jpeg" />
            {/* <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
              11
            </div> */}
          </div>
        </section>
      </section>
    </header>
  )
}
