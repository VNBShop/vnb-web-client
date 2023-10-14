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
    <>
      <Header />
      <section className="mt-7 max-w-secondary mx-auto px-4">
        <section className="flex items-end justify-between">
          <div className="flex gap-5 items-center">
            <figure className=" w-[110px] h-[110px] rounded-full">
              {/* <Image src={''} /> */}
              <p className="text-5xl font-medium rounded-full bg-black text-white w-full h-full flex items-center justify-center">
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

        <UserNavigation userId="jungjung261" />
        {children}
      </section>
    </>
  )
}
