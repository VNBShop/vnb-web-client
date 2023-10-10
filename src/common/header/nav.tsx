'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { nav } from '@/data'
import Icon, { IconName } from '../icons'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'

type NavProps = {
  title: string
  url: string
}

export default function Nav() {
  const pathname = usePathname()

  const [navMobile, setOpenNavMobile] = useState(false)

  const refNavMobile = useRef<HTMLDivElement | null>(null)

  const handleCloseOutSide = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!refNavMobile.current) return

    if (!refNavMobile.current.contains(event.target as Node)) {
      setOpenNavMobile(false)
    }
  }

  useEffect(() => {
    if (navMobile) {
      document.documentElement.style.overflow = 'hidden'
    }

    return () => {
      document.documentElement.style.overflow = 'unset'
    }
  }, [navMobile])

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
                className={`text-sm font-medium flex items-center gap-1 ${
                  item.url === '/forum'
                    ? ' text-transparent bg-messenger bg-clip-text font-semibold'
                    : ''
                }`}
                href={item.url}
              >
                {item.title}
              </Link>

              <div className="w-full h-[2px] group-hover:block hidden bg-black absolute bottom-[-18px] right-0 left-0" />
              {pathname === item.url && (
                <div className="w-full h-[2px] bg-black absolute bottom-[-18px] right-0 left-0" />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button className="lg:hidden" onClick={() => setOpenNavMobile(true)}>
        <Icon name="Hamburger" width={30} height={30} />
      </button>
      <Transition
        show={navMobile}
        className="nav-mobile fixed lg:hidden top-0 left-0 bottom-0 right-0 bg-clip-padding bg-opacity-30 bg-gray-100 backdrop-blur-sm"
        onClick={handleCloseOutSide}
      >
        <Transition.Child
          ref={refNavMobile}
          enter="transition-all duration-300 ease-in-out"
          enterFrom="opacity-0 -translate-x-[100%]"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-300 ease-in-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-[100%]"
          className="w-[75%] md:w-[40%] absolute top-0 left-0 bottom-0 bg-white p-4"
        >
          <section className="flex items-center justify-between">
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

            <button onClick={() => setOpenNavMobile(false)}>
              <Icon name="Xmark" width={25} height={25} />
            </button>
          </section>
          <ul className=" grid gap-4 mt-5">
            {nav.map((item) => (
              <li key={item.url} className=" group relative flex items-center">
                <Link
                  className="font-medium text-sm flex items-center gap-2"
                  href={item.url}
                >
                  <Icon name={item.title as IconName} width={18} height={18} />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Transition.Child>
      </Transition>

      <Button
        className="h-9 shadow-none border hover:bg-black hover:text-white ml-2"
        variant="outline"
        asChild
      >
        <Link href="/signin">Sign in</Link>
      </Button>
    </>
  )
}
