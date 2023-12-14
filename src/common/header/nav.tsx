'use client'

import { Fragment, useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { useModal } from '@/_store/useModal'
import Avatar from '@/components/avatar'
import CartDrawer from '@/components/drawers/cart.drawer'
import NavDrawer from '@/components/drawers/nav.drawer'
import ModalChangePassword from '@/components/modals/change-password'
import { Button } from '@/components/ui/button'
import { nav } from '@/data'

import Icon from '../icons'

type NavProps = {
  user: Session['user']
}

export default function Nav({ user }: NavProps) {
  const pathname = usePathname()

  const { setModal } = useModal((state) => state)

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
      <ModalChangePassword />
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

      {user && Object.keys(user)?.length ? (
        <Menu as="div" className="relative flex items-center justify-center">
          <Menu.Button>
            <Avatar
              username={user.username}
              src={user?.avatar ?? user?.image ?? ''}
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
            <Menu.Items className="absolute -right-4 top-[120%] z-10 grid min-w-[320px]  gap-[6px] rounded-lg bg-white p-2 shadow-box">
              <Menu.Item
                as="div"
                className="flex items-center gap-2 rounded-md p-2 text-sm font-medium shadow-sm hover:cursor-pointer hover:bg-gray-100"
              >
                <Avatar
                  username={user.username}
                  className="h-10 w-10"
                  src={user?.avatar ?? user?.image ?? ''}
                />
                {user?.username?.split('@')[0] ?? user.name}
              </Menu.Item>

              <Menu.Item
                as="div"
                className="flex items-center gap-2 rounded-md p-2 py-1 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
                onClick={() => setModal('modalChangePassword')}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                  <Icon name="Key" width={18} height={18} />
                </div>
                Change password
              </Menu.Item>

              <Menu.Item
                as="div"
                className="flex items-center gap-2 rounded-md p-2 py-1 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
                onClick={() => signOut()}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                  <Icon name="Logout" width={18} height={18} />
                </div>
                Logout
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Button
          className="ml-2 h-9 border bg-black text-white shadow-none"
          variant="outline"
          asChild
        >
          <Link href="/signin">Sign in</Link>
        </Button>
      )}

      <button className="lg:hidden" onClick={() => setOpenNavMobile(true)}>
        <Icon name="Hamburger" width={30} height={30} />
      </button>
    </>
  )
}
