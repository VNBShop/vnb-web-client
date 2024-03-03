'use client'

import { useState } from 'react'

import Icon from '@/common/icons'
import UpdateOrderInfoForm from '@/components/form/update-order-info'
import { Modal } from '@/components/ui/modal'

import { User } from '../../../../types/user'

type IProps = {
  user: User
}

export default function OrderAction({ user }: IProps) {
  const [modal, setModal] = useState(false)

  const onCloseModal = () => {
    setModal(false)
  }
  return (
    <>
      <Modal
        header="Update delivery info"
        show={modal}
        onCloseModal={onCloseModal}
      >
        <UpdateOrderInfoForm user={user as User} onCloseModal={onCloseModal} />
      </Modal>

      <div
        className="ml-4 flex items-center gap-1 text-sm hover:cursor-pointer"
        onClick={() => setModal(true)}
      >
        <Icon name="Pen" size={15} color="blue" />
        <span className="text-blue-700">Edit</span>
      </div>
    </>
  )
}
