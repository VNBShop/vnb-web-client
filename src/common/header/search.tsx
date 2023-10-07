'use client'

import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { useState } from 'react'
import Icon from '../icons'

export default function Search() {
  const [searchPopup, setSearchPopup] = useState(false)

  const handleOpenSearchPopup = () => {
    setSearchPopup((prev) => !prev)
  }

  return (
    <>
      <div
        className="flex-1 h-9 rounded-full lg:w-[200px] w-9 cursor-pointer justify-center lg:justify-normal border gap-1 flex items-center lg:p-3"
        onClick={handleOpenSearchPopup}
      >
        <Icon name="Search" width={20} height={20} color="gray" />
        <span className="text-gray-500 text-xs hidden lg:block">
          Search product...
        </span>
      </div>

      <Modal
        show={searchPopup}
        close={() => setSearchPopup(false)}
        closeOutside
      >
        <section className="flex items-center relative">
          <Icon width={22} height={22} name="Search" />
          <Input
            placeholder="Search product..."
            className="text-sm border-none flex-1 h-8"
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
