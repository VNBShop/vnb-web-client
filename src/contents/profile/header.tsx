'use client'

import { useState } from 'react'

import Link from 'next/link'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import UpdateAvatarForm from '@/components/form/update-avatar'
import UpdateProfileForm from '@/components/form/update-profile'
import ProfileHeaderSkeleton from '@/components/skeletons/profile-header'
import { Button } from '@/components/ui/button'

import { Modal } from '@/components/ui/modal'
import useFetchUser from '@/hooks/user/useFetchUser'

import UserNavigation from './navigation'

import { User } from '../../../types/user'

export default function ProfileHeader() {
  const { data, isFetching, isLoading } = useFetchUser()
  const [modal, setModal] = useState(false)
  const [avtModal, setAvtModal] = useState(false)

  const onCloseModal = () => {
    setModal(false)
  }

  const onCloseAvtModal = () => {
    setAvtModal(false)
  }

  return (
    <>
      {isFetching || isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <section className="mx-auto w-full max-w-secondary px-4">
          <section className="mt-7 flex flex-col items-center justify-between gap-y-4 md:flex-row md:items-end">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <div className=" relative rounded-full">
                <Avatar
                  src={data?.avatar ?? ''}
                  username={data?.firstName ?? 'Z'}
                  className="h-[110px] w-[110px]"
                  nameSize={36}
                />
                <div
                  onClick={() => setAvtModal(true)}
                  className=" absolute bottom-[5px] right-[5px] flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:cursor-pointer"
                >
                  <Icon name="Pen" size={15} />
                </div>
              </div>

              <article className=" space-y-1 text-center md:text-left">
                <p className=" text-2xl font-semibold">
                  {data?.firstName && data?.lastName
                    ? `${data?.firstName} ${data?.lastName}`
                    : data?.email}
                </p>
                <p className="text-sm text-gray-500">@{data?.email ?? '-'}</p>
              </article>
            </div>

            <div className=" space-x-2 text-center ">
              <Button className="h-9 space-x-1" onClick={() => setModal(true)}>
                <Icon name="Pen" size={18} />
                <span>Edit profile</span>
              </Button>

              <Link href="/conversation" passHref>
                <Button className="h-9 space-x-1 bg-white text-black hover:bg-transparent">
                  <Icon name="Messenger" size={18} />
                  <span>Messenger</span>
                </Button>
              </Link>
            </div>
          </section>
          <hr className="mb-1 mt-4" />
          <UserNavigation userId="jungjung261" />
        </section>
      )}

      <Modal
        size="lg"
        show={modal}
        header="Update profile"
        onCloseModal={onCloseModal}
      >
        <UpdateProfileForm onCloseModal={onCloseModal} user={data as User} />
      </Modal>

      <Modal
        show={avtModal}
        onCloseModal={onCloseAvtModal}
        header="Update avatar"
      >
        <UpdateAvatarForm onCloseModal={onCloseAvtModal} />
      </Modal>
    </>
  )
}
