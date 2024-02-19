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
      className="nav-mobile fixed bottom-0 left-0 right-0 top-0 bg-gray-100 bg-opacity-30 bg-clip-padding backdrop-blur-sm lg:hidden"
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
        className="absolute bottom-0 left-0 top-0 w-[75%] bg-white p-4 md:w-[40%]"
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
            <Icon name="Xmark" size={25} />
          </button>
        </section>
        <ul className=" mt-5 grid gap-4">
          {nav.map((item) => (
            <li key={item.url} className=" group relative flex items-center">
              <Link
                className="flex items-center gap-2 text-sm font-medium"
                href={item.url}
              >
                <Icon name={item.title as IconName} size={18} />
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
