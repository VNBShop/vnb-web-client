'use client'
import { createRef, useState } from 'react'

import Icon from '@/common/icons'
import { Input } from '@/components/ui/input'
import { Modal, ModalProps } from '@/components/ui/modal'

export default function ForumSearch() {
  const searchModalRef = createRef<ModalProps>()

  const handleOpenSearchPopup = () => {
    !!searchModalRef.current && searchModalRef.current.onOpen()
  }

  return (
    <>
      <div
        className="flex h-9 w-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border lg:w-[200px] lg:justify-normal lg:p-3"
        onClick={handleOpenSearchPopup}
      >
        <Icon name="Search" size={20} color="gray" />
        <span className="hidden text-xs text-gray-500 lg:block">
          Search something...
        </span>
      </div>

      <Modal ref={searchModalRef} closeOutside>
        <section className="relative flex items-center">
          <Icon size={22} name="Search" />
          <Input
            placeholder="Search something..."
            className="h-8 flex-1 border-none text-sm"
            autoFocus
          />
          <figure
            className=" absolute right-0 hover:cursor-pointer"
            onClick={() =>
              !!searchModalRef.current && searchModalRef.current.onClose()
            }
          >
            <Icon size={22} name="Xmark" />
          </figure>
        </section>
      </Modal>
    </>
  )
}
