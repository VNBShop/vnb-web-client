'use client'
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import Icon from '@/common/icons'

import Spiner from '@/common/spiner'
import Avatar from '@/components/avatar'

import { useUserContext } from '@/context/user'

import useSignout from '@/hooks/commons/useSignout'

import ForumSearch from './search'

export default function ForumHeader() {
  const pathname = usePathname()

  const user = useUserContext()

  const { isPending, onSignOut } = useSignout()

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
            <Icon name="Bell" size={23} />
            <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
              12
            </div>
          </div>

          {!pathname.startsWith('/conversation') ? (
            <Link
              href="/conversation"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:cursor-pointer lg:hover:bg-gray-200"
            >
              <Icon name="Plane" size={23} />
              <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
                12
              </div>
            </Link>
          ) : null}
          <div className="relative h-10 w-10 rounded-full hover:cursor-pointer ">
            <Menu
              as="div"
              className="relative flex items-center justify-center"
            >
              <Menu.Button>
                <Avatar
                  username={user?.firstName ?? 'Z'}
                  src={user?.avatar ?? ''}
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
                <Menu.Items className="absolute -right-4 top-[120%] z-10 grid min-w-[330px]  gap-[6px] rounded-lg bg-white p-2 shadow-box">
                  <Link href="/profile" passHref>
                    <Menu.Item
                      as="div"
                      className="flex items-center gap-2 rounded-md p-2 py-4 text-sm font-medium shadow-md hover:cursor-pointer hover:bg-gray-100"
                    >
                      <Avatar
                        src={user?.avatar ?? ''}
                        username={user?.firstName ?? 'Z'}
                      />
                      {user?.firstName && user?.lastName
                        ? `${user?.firstName} ${user?.lastName}`
                        : user?.email}
                    </Menu.Item>
                  </Link>

                  <Link href="/profile/saved" passHref>
                    <Menu.Item
                      as="div"
                      className="flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
                    >
                      <Icon name="Coin" size={18} />
                      Saved
                    </Menu.Item>
                  </Link>

                  <Menu.Item
                    as="div"
                    disabled={isPending}
                    onClick={onSignOut}
                    className="flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
                  >
                    {isPending ? (
                      <Spiner size={18} />
                    ) : (
                      <Icon name="Logout" size={18} />
                    )}
                    Logout
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
              11
            </div> */}
          </div>
        </section>
      </section>
    </header>
  )
}
