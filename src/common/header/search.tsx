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
        className="text-xs flex-1 h-9 rounded-full w-[200px] cursor-pointer border text-gray-500  flex items-center p-3"
        onClick={handleOpenSearchPopup}
      >
        Search product...
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
