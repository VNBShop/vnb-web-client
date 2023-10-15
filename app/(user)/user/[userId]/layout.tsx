import React from 'react'

import Image from 'next/image'

import Header from '@/common/header'
import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'
import UserNavigation from '@/contents/user/navigation'

type UserLayoutProps = {
  children: React.ReactNode
  params: {
    userId: string
  }
}

export default function UserLayout({ children, params }: UserLayoutProps) {
  return (
    <div className=" absolute inset-0 flex flex-col">
      <Header />

      <section className="mx-auto w-full max-w-secondary">
        <section className="mt-7 flex items-end justify-between">
          <div className="flex items-center gap-5">
            <figure className=" h-[110px] w-[110px] rounded-full">
              {/* <Image src={''} /> */}
              <p className="flex h-full w-full items-center justify-center rounded-full bg-black text-5xl font-medium text-white">
                D
              </p>
            </figure>

            <article className=" space-y-1">
              <p className=" text-2xl font-semibold">Dzung</p>
              <p>@jungjung261</p>
            </article>
          </div>

          <div className=" space-x-2">
            <Button className="h-9 space-x-1" variant="outline">
              <Icon name="Pen" width={18} height={18} />
              <span>Edit profile</span>
            </Button>

            <Button className="h-9 space-x-1">
              <Icon name="Plus" width={18} height={18} />
              <span>Add post</span>
            </Button>
          </div>
        </section>
        <hr className="mb-1 mt-4" />
        <UserNavigation userId="jungjung261" />
      </section>
      <section className="flex-1 border border-t bg-gray-100">
        {children}
      </section>
    </div>
  )
}
