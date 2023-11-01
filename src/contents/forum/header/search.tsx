'use client'
import { useState } from 'react'

import Icon from '@/common/icons'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'

export default function ForumSearch() {
  const [searchPopup, setSearchPopup] = useState(false)

  const handleOpenSearchPopup = () => {
    setSearchPopup((prev) => !prev)
  }

  return (
    <>
      <div
        className="flex h-9 w-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border lg:w-[200px] lg:justify-normal lg:p-3"
        onClick={handleOpenSearchPopup}
      >
        <Icon name="Search" width={20} height={20} color="gray" />
        <span className="hidden text-xs text-gray-500 lg:block">
          Search something...
        </span>
      </div>

      <Modal
        show={searchPopup}
        close={() => setSearchPopup(false)}
        closeOutside
      >
        <section className="relative flex items-center">
          <Icon width={22} height={22} name="Search" />
          <Input
            placeholder="Search something..."
            className="h-8 flex-1 border-none text-sm"
            autoFocus
          />
          <figure
            className=" absolute right-0 hover:cursor-pointer"
            onClick={() => setSearchPopup(false)}
          >
            <Icon width={22} height={22} name="Xmark" />
          </figure>
        </section>
      </Modal>
    </>
  )
}
