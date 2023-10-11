'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import CartDrawer from '@/components/drawers/cart.drawer'
import NavDrawer from '@/components/drawers/nav.drawer'
import { Button } from '@/components/ui/button'
import { nav } from '@/data'

import Icon from '../icons'

export default function Nav() {
  const pathname = usePathname()

  const [navMobile, setOpenNavMobile] = useState(false)
  const [cartCont, setCartCont] = useState(false)

  useEffect(() => {
    if (navMobile || cartCont) {
      document.documentElement.style.overflow = 'hidden'
    }

    return () => {
      document.documentElement.style.overflow = 'unset'
    }
  }, [navMobile, cartCont])

  return (
    <>
      <NavDrawer navMobile={navMobile} setOpenNavMobile={setOpenNavMobile} />
      <CartDrawer cartCont={cartCont} setCartCont={setCartCont} />
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

      <Button
        className="h-9 shadow-none border hover:bg-gray-50  ml-2"
        variant="outline"
        onClick={() => setCartCont(true)}
      >
        <Icon name="Cart" width={20} height={20} />
      </Button>

      <Button
        className="h-9 shadow-none border bg-black text-white ml-2"
        variant="outline"
        asChild
      >
        <Link href="/signin">Sign in</Link>
      </Button>

      <button className="lg:hidden" onClick={() => setOpenNavMobile(true)}>
        <Icon name="Hamburger" width={30} height={30} />
      </button>
    </>
  )
}
