'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import Icon from './icons'

const NewAnimateBadge = dynamic(() => import('./new-animate'), { ssr: false })

export default function Banner() {
  const pathname = usePathname()
  return (
    <section className={` bg-black ${pathname !== '/' ? ' hidden' : ''}`}>
      <section className="relative mx-auto flex max-w-main items-center justify-center px-4 py-[6px]">
        <div className="invisible flex items-center gap-1 text-sm text-white lg:visible">
          <div className=" relative hidden lg:block">
            <NewAnimateBadge />
          </div>{' '}
          Big sale, discount upto 50%!{'    '}
          <Link href="/products" className=" ml-1 underline">
            Shop now!
          </Link>
        </div>

        <section className="absolute right-4 flex items-center gap-2">
          <p className="flex items-center gap-1 text-xs text-white">
            <Icon name="Phone" width={17} height={17} />
            1900 1087
          </p>
          <div className="h-[18px] w-[1px] bg-white" />
          <p className="flex items-center gap-2 text-xs text-white">
            <Icon name="Plane" width={17} height={17} />
            Store system
          </p>
        </section>
      </section>
    </section>
  )
}
