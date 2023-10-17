import React from 'react'

import Image from 'next/image'

import Header from '@/common/header'
import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
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

      <section className="mx-auto w-full max-w-secondary px-4">
        <section className="mt-7 flex flex-col items-center justify-between gap-y-4 md:flex-row md:items-end">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <Avatar
              src="/common/avt.jpeg"
              username="D"
              className="h-[110px] w-[110px]"
              nameSize={36}
            />

            <article className=" space-y-1 text-center md:text-left">
              <p className=" text-2xl font-semibold">Dzung</p>
              <p>@jungjung261</p>
            </article>
          </div>

          <div className=" space-x-2 text-center ">
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
