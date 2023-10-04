'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { nav } from '@/data'
import Icon, { IconName } from '../icons'
import { Button } from '@/components/ui/button'

type NavProps = {
  title: string
  url: string
}

export default function Nav() {
  const pathname = usePathname()

  return (
    <>
      <nav className=" items-center hidden lg:flex">
        <ul className="flex items-center h-full">
          {nav.map((item) => (
            <li
              key={item.url}
              className=" group relative px-4 flex items-center"
            >
              <Link
                className="text-sm font-medium flex items-center gap-1"
                href={item.url}
              >
                <Icon name={item.title as IconName} width={18} height={18} />
                {item.title}
              </Link>

              <div className="w-full h-[2px] group-hover:block hidden bg-black absolute bottom-[-18px] right-0 left-0" />
              {pathname === item.url && (
                <div className="w-full h-[2px] bg-black absolute bottom-[-18px] right-0 left-0" />
              )}
            </li>
          ))}
        </ul>

        <Button
          className="h-9 shadow-none border hover:bg-black hover:text-white ml-2"
          variant="outline"
        >
          Sign in
        </Button>
      </nav>

      <button className="lg:hidden">
        <Icon name="Hamburger" width={30} height={30} />
      </button>

      <section className="nav-mobile fixed lg:hidden top-0 left-0 bottom-0 right-0 bg-clip-padding bg-opacity-30 bg-gray-100 backdrop-blur-sm">
        <nav className="w-[75%] md:w-[40%] absolute top-0 left-0 bottom-0 bg-white"></nav>
      </section>
    </>
  )
}
