import { Fragment, useCallback, useTransition } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Icon from '@/common/icons'

import { orderedStatusOption } from '@/lib/contants'

import { OrderedStatus } from '../../../types/order'

export default function UserOrderedFilter() {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get('orderedStatus')

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const onFilter = (status: OrderedStatus) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          orderedStatus: status,
        })}`,
        {
          scroll: false,
        }
      )
    })
  }

  return (
    <section className="flex items-center gap-4">
      {!!status && (
        <div className=" flex items-center gap-1 rounded-full bg-[#e1e5fe] py-[2px] pl-3 pr-1 text-[13px] font-medium text-[#4d3cc6] ">
          {orderedStatusOption.find((item) => item.value === status)?.label}
          <div
            className="p-1 hover:cursor-pointer"
            onClick={() => {
              router.push(`${pathname}`, {
                scroll: false,
              })
            }}
          >
            <Icon name="Xmark" size={16} />
          </div>
        </div>
      )}
      <Menu as="div" className="relative flex items-center justify-center">
        <Menu.Button>
          <Icon name="Filter" size={20} />
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
            {orderedStatusOption.map((i) => (
              <Menu.Item
                disabled={isPending}
                as="div"
                onClick={() => onFilter(i.value)}
                key={i.value}
                className="flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
              >
                {i.label}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  )
}
