import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import useSearchUser from '@/hooks/forum/useSearchUser'
import { useDebounce } from '@/hooks/useDebounce'

export default function ConversationSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const ref = useRef<HTMLDivElement>(null)

  const valueSearch = useDebounce(search, 1300)

  const { loading, users } = useSearchUser({
    name: valueSearch,
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full px-2" onClick={() => setOpen(true)}>
      <div
        ref={ref}
        className="flex w-full items-center gap-1 rounded-full border bg-gray-50 p-2 py-2 text-sm hover:cursor-text"
      >
        <Icon name="Search" size={20} color="gray" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-xs text-gray-500 focus-within:outline-0"
          placeholder="Search conversation..."
        />
      </div>

      {open && (
        <div className=" absolute top-[100%] z-[1] max-h-[380px] min-h-[100px] w-[95%] rounded-md bg-white px-2 py-2 shadow-md">
          {users?.length && !loading && (
            <section className="mt-2 space-y-2">
              {users.map((user) => (
                <Link
                  onClick={() => setOpen(false)}
                  href={`/conversation/${user?.userId}`}
                  key={user?.userId}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100"
                >
                  <Avatar src={user?.avatar ?? ''} username={user?.fullName} />
                  <div className="text-[13px] font-medium">
                    {user?.fullName}
                  </div>
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

          {!users?.length && !loading && !!valueSearch ? (
            <p className="mt-7 text-center text-sm text-gray-500">
              Can find this user, try again!
            </p>
          ) : (
            !loading &&
            !users?.length && (
              <p className="mt-7 text-center text-sm text-gray-500">
                Find someone to start conversation!
              </p>
            )
          )}
        </div>
      )}
    </div>
  )
}
