'use client'
import { createRef, useState } from 'react'

import Icon from '@/common/icons'

import { useUserContext } from '@/context/user'

import Avatar from './avatar'
import AddPostForm from './form/add-post'
import { Modal, ModalProps } from './ui/modal'

export default function AddPost() {
  const [addPostM, setAddPostM] = useState(false)
  const openAddPostModal = () => {
    setAddPostM(true)
  }

  const onClose = () => {
    setAddPostM(false)
  }

  const user = useUserContext()

  return (
    <>
      <section className="space-y-3 border-b bg-white p-4 py-3 md:rounded-md md:shadow-box lg:border-none">
        <section className="flex items-center gap-2">
          <Avatar src={user?.avatar ?? ''} username={user?.firstName ?? 'Z'} />
          <div
            className="flex-1 rounded-full bg-gray-100 p-2 pl-4 hover:cursor-pointer lg:hover:bg-gray-200"
            onClick={openAddPostModal}
          >
            <p className=" text-sm text-gray-400">Post something...</p>
          </div>
        </section>

        <hr />

        <section>
          <div
            className="inline-flex items-center gap-2 rounded-md p-2 hover:cursor-pointer lg:hover:bg-gray-100"
            onClick={openAddPostModal}
          >
            <Icon name="Photo" size={20} color="green" />
            <p className="text-sm font-medium text-gray-500">Photo/Video</p>
          </div>
        </section>
      </section>

      <Modal show={addPostM} header="Add new post" onCloseModal={onClose}>
        <section className="mt-4 inline-flex items-center gap-2">
          <Avatar src={user?.avatar ?? ''} username={user?.firstName ?? 'Z'} />
          <article>
            <p className="text-sm font-medium">
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : user?.email?.charAt(0)}
            </p>
            <p className="text-xs">{user?.email}</p>
          </article>
        </section>

        <AddPostForm onCloseModal={onClose} />
      </Modal>
    </>
  )
}
