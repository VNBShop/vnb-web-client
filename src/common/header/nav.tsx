'use client'

import { Fragment, useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'

import Avatar from '@/components/avatar'
import CartDrawer from '@/components/drawers/cart.drawer'
import NavDrawer from '@/components/drawers/nav.drawer'
import { Button } from '@/components/ui/button'
import { nav } from '@/data'

import Icon from '../icons'

export default function Nav() {
  const pathname = usePathname()

  const { data } = useSession()

  console.log('data> >>> >> ', data)

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
      <nav className=" hidden items-center lg:flex">
        <ul className="flex h-full items-center">
          {nav.map((item) => (
            <li
              key={item.url}
              className=" group relative flex items-center px-4"
            >
              <Link
                className={`flex items-center gap-1 text-sm font-medium ${
                  item.url === '/forum'
                    ? ' bg-messenger bg-clip-text font-semibold text-transparent'
                    : ''
                }`}
                href={item.url}
              >
                {item.title}
              </Link>

              <div className="absolute bottom-[-18px] left-0 right-0 hidden h-[2px] w-full bg-black group-hover:block" />
              {pathname === item.url && (
                <div className="absolute bottom-[-18px] left-0 right-0 h-[2px] w-full bg-black" />
              )}
            </li>
          ))}
        </ul>
      </nav>

      <Button
        className="ml-2 h-9 border shadow-none"
        variant="outline"
        onClick={() => setCartCont(true)}
      >
        <Icon name="Cart" width={20} height={20} />
      </Button>

      {!data?.user ? (
        <Button
          className="ml-2 h-9 border bg-black text-white shadow-none"
          variant="outline"
          asChild
        >
          <Link href="/signin">Sign in</Link>
        </Button>
      ) : (
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <Avatar
              username={data?.user.username}
              src={data?.user?.avatar ?? ''}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -right-4 top-[120%] z-10 grid min-w-[250px] gap-2 rounded-lg bg-white p-2 shadow-box">
              <Menu.Item
                as="div"
                className="rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
              >
                {data?.user?.username}
              </Menu.Item>
              <Menu.Item
                as="div"
                className="rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
                onClick={() => signOut()}
              >
                Logout
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}

      <button className="lg:hidden" onClick={() => setOpenNavMobile(true)}>
        <Icon name="Hamburger" width={30} height={30} />
      </button>
    </>
  )
}
