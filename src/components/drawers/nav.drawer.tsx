import { Dispatch, SetStateAction, memo, useRef } from 'react'

import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

import Icon, { IconName } from '@/common/icons'
import { nav } from '@/data'

const NavSheet = ({
  navMobile,
  setOpenNavMobile,
}: {
  navMobile: boolean
  setOpenNavMobile: Dispatch<SetStateAction<boolean>>
}) => {
  const refNavMobile = useRef<HTMLDivElement | null>(null)
  const handleCloseOutSide = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!refNavMobile.current) return

    if (!refNavMobile.current.contains(event.target as Node)) {
      setOpenNavMobile(false)
    }
  }

  return (
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
  )
}

export default memo(NavSheet)
