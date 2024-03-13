'use client'
import { createRef, useState } from 'react'

import Link from 'next/link'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import { Input } from '@/components/ui/input'
import { Modal, ModalProps } from '@/components/ui/modal'
import useSearchUser from '@/hooks/forum/useSearchUser'
import { useDebounce } from '@/hooks/useDebounce'

export default function ForumSearch() {
  const searchModalRef = createRef<ModalProps>()

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const valueSearch = useDebounce(search, 1300)

  const { loading, users } = useSearchUser({
    name: valueSearch,
  })

  return (
    <>
      <div
        className="flex h-9 w-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border lg:w-[200px] lg:justify-normal lg:p-3"
        onClick={() => setOpen(true)}
      >
        <Icon name="Search" size={20} color="gray" />
        <span className="hidden text-xs text-gray-500 lg:block">
          Search something...
        </span>
      </div>

      <Modal show={open} onCloseModal={() => setOpen(false)} closeOutside>
        <section className="relative flex items-center">
          <Icon size={22} name="Search" />
          <Input
            placeholder="Search something..."
            className="h-8 flex-1 border-none text-sm"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <figure
            className=" absolute right-0 hover:cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Icon size={22} name="Xmark" />
          </figure>
        </section>

        {users?.length && !loading && (
          <section className="mt-2 space-y-2">
            {users.map((user) => (
              <Link
                onClick={() => setOpen(false)}
                href={`/user/${user?.userId}`}
                key={user?.userId}
                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100"
              >
                <Avatar src={user?.avatar ?? ''} username={user?.fullName} />
                <div className="text-[13px] font-medium">{user?.fullName}</div>
              </Link>
            ))}
          </section>
        )}

        {loading && !users?.length && (
          <section className="mt-2 animate-pulse space-y-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="h-4 w-[140px] rounded-full bg-gray-200"></div>
              </div>
            ))}
          </section>
        )}

        {!users?.length && !loading && !!valueSearch && (
          <p className="mt-7 text-center text-sm text-gray-500">
            Can find this user, try again!
          </p>
        )}
      </Modal>
    </>
  )
}
