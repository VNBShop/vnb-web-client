'use client'
import { useState } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import Icon from '@/common/icons'
import Spiner from '@/common/spiner'
import useDeleteChat from '@/hooks/chat/useDeleteChat'
import { cn } from '@/lib/utils'

import Avatar from './avatar'

import { Button } from './ui/button'
import { Modal } from './ui/modal'

import { ChatCard } from '../../types/messenger'
dayjs.extend(relativeTime)

type IProps = {
  chat: ChatCard
}

export default function ConversationCard({ chat }: IProps) {
  const pathname = usePathname()

  const [modal, setModal] = useState(false)

  const { loading, onDeleteMessage } = useDeleteChat({
    onSuccess: () => {
      setModal(false)
    },
  })

  return (
    <>
      <Link
        href={`/conversation/${chat?.receiverId}`}
        className={cn(
          'group relative flex items-center gap-2 rounded-md px-2 py-[5px] lg:hover:bg-gray-100',
          pathname === `/conversation/${chat?.receiverId}`
            ? 'bg-slate-100'
            : 'bg-transparent'
        )}
      >
        <Avatar
          src={chat?.receiverAvatar ?? ''}
          username={chat?.receiverName}
          className="h-12 w-12"
        />
        <section className="flex-1">
          <p className="text-sm font-medium">{chat?.receiverName}</p>
          <div className="flex items-center">
            <p className=" line-clamp-1 flex-1 text-xs text-gray-600">
              {chat?.latestMessage}
            </p>
            <span className="text-xs">
              {chat?.latestMessageAt
                ? dayjs(chat.latestMessageAt).fromNow()
                : null}
            </span>
          </div>
        </section>

        <div
          onClick={() => setModal(true)}
          className="absolute right-2 top-[20%] hidden h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-white bg-[rgba(0,0,0,.1)] text-white backdrop-blur group-hover:flex"
        >
          <Icon name="Trash" size={16} />
        </div>
      </Link>

      <Modal
        header="Confirm delete message"
        show={modal}
        onCloseModal={() => setModal(false)}
      >
        <p className="text-sm text-gray-700">
          Are you sure you want to delete this message?
        </p>

        <section className="mt-5 flex items-center justify-end">
          <Button
            disabled={loading}
            variant="ghost"
            onClick={() => setModal(false)}
            className="hover:underline"
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation()
              onDeleteMessage({
                receiverId: chat?.receiverId,
              })
            }}
            className=" space-x-1 bg-danger text-white hover:bg-danger/70"
            size="sm"
          >
            {loading && <Spiner size={16} />}
            <span> Delete</span>
          </Button>
        </section>
      </Modal>
    </>
  )
}
