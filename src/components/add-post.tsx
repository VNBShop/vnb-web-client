'use client'
import { useState } from 'react'

import Icon from '@/common/icons'

import AddPostForm from './form/add-post'
import { Modal } from './ui/modal'

export default function AddPost() {
  const [addPostModal, setAddPostModal] = useState(false)

  const openAddPostModal = () => {
    setAddPostModal((prev) => !prev)
  }

  return (
    <>
      <section className="space-y-3 bg-white p-4 py-3 md:rounded-md md:shadow-box">
        <section className="flex items-center gap-2">
          <figure className="h-10 w-10 rounded-full">
            <p className="textw-white flex h-full w-full items-center justify-center rounded-full bg-black text-xl text-white">
              D
            </p>
          </figure>
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
            <Icon name="Photo" width={20} height={20} color="green" />
            <p className="text-sm font-medium text-gray-500">Photo/Video</p>
          </div>
        </section>
      </section>

      <Modal
        show={addPostModal}
        close={() => setAddPostModal(false)}
        closeOutside
      >
        <section className="inline-flex items-center gap-2">
          <figure className="h-10 w-10 rounded-full">
            <p className="textw-white flex h-full w-full items-center justify-center rounded-full bg-black text-xl text-white">
              D
            </p>
          </figure>
          <article>
            <p className="text-sm font-medium">Dzung</p>
            <p className="text-xs">@jungjung261</p>
          </article>
        </section>

        <AddPostForm />
      </Modal>
    </>
  )
}
