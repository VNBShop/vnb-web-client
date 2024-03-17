import { Fragment, useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'

import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import Icon from '@/common/icons'
import useFetchNotify from '@/hooks/forum/useFetchNotify'
import useSocketNotify from '@/hooks/forum/useSocketNotify'

import { logo } from '../../../../public/common'
import { Notification, Post } from '../../../../types/forum'

export default function Notification() {
  const router = useRouter()

  const { notifys, hasNextPage, onFetchNextPage, isPending, setNotifys } =
    useFetchNotify()

  // const socket = useSocketNotify()

  const onRead = ({
    id,
    postId,
  }: {
    id: Notification['notificationId']
    postId: Post['postId']
  }) => {
    if (!id) return

    // socket?.emit('read_notification', id)

    setNotifys((prev) => {
      const findIndex = prev.findIndex((i) => i?.notificationId === id)

      if (findIndex !== -1) {
        const newNotifys = [...prev]

        newNotifys[findIndex] = {
          ...newNotifys[findIndex],
          isRead: true,
        }

        return newNotifys
      }
      return prev
    })

    router.push(`/forum/${postId}`)
  }

  // useEffect(() => {
  //   const onReceiveNoti = (notify: Notification) => {
  //     console.log('notify >>>>', notify)

  //     setNotifys((prev) => [notify, ...prev])
  //   }

  //   socket?.on('receive_notification', onReceiveNoti)

  //   return () => {
  //     socket?.off('receive_notification', onReceiveNoti)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket])

  return (
    <Menu as="div" className="relative flex items-center justify-center">
      <Menu.Button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:cursor-pointer lg:hover:bg-gray-200">
        <Icon name="Bell" size={23} />
        {!!notifys?.filter((noti) => !noti?.isRead)?.length ? (
          <div className="absolute -right-1 -top-1 flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-[10px] text-white">
            {notifys?.filter((noti) => !noti?.isRead)?.length}
          </div>
        ) : null}
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
        <Menu.Items className="absolute -right-4 top-[120%] z-10 grid max-h-[calc(100vh-100px)] min-w-[370px] gap-[6px]  overflow-auto rounded-lg bg-white p-2 shadow-box">
          <h2 className="mb-1 text-sm font-medium">Notifications</h2>

          {!!notifys?.length &&
            notifys.map((noti) => (
              <Menu.Item
                key={noti?.notificationId}
                onClick={() => {
                  onRead({
                    id: noti?.notificationId,
                    postId: noti?.postId,
                  })
                }}
                as="div"
                className="flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
              >
                <figure className=" relative h-11 w-11 overflow-hidden rounded-full">
                  <Image
                    alt="avt"
                    src={noti?.actorAvatar ?? logo}
                    fill
                    sizes="100vw"
                    className=" object-cover"
                  />
                </figure>
                <div className="flex-1">
                  <span>{noti?.actorName ?? 'VNB'}</span>
                  {` `}
                  <span className=" font-normal text-gray-700">
                    {noti?.content}
                  </span>
                </div>

                {!noti?.isRead && (
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                )}
              </Menu.Item>
            ))}

          {!notifys?.length && !isPending && (
            <p className="py-6 text-center text-sm text-gray-500">
              No notifications yet!
            </p>
          )}

          {isPending &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-2"
              >
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="h-4 w-[calc(100%-16px)] flex-1 rounded-full bg-gray-200"></div>
              </div>
            ))}

          {!isPending && hasNextPage && (
            <div
              onClick={onFetchNextPage}
              className="mb-2 text-center text-sm font-medium text-blue-500 hover:cursor-pointer hover:underline"
            >
              Load more...
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
