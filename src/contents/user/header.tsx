'use client'

import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import ProfileHeaderSkeleton from '@/components/skeletons/profile-header'
import { Button } from '@/components/ui/button'

import useFetchUser from '@/hooks/user/useFetchUser'

import UserNavigation from './navigation'

export default function ProfileHeader() {
  const { data, isFetching, isLoading } = useFetchUser()
  return (
    <>
      {isFetching || isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <section className="mx-auto w-full max-w-secondary px-4">
          <section className="mt-7 flex flex-col items-center justify-between gap-y-4 md:flex-row md:items-end">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <Avatar
                src={data?.avatar as string}
                username={data?.firstName ?? 'Z'}
                className="h-[110px] w-[110px]"
                nameSize={36}
              />

              <article className=" space-y-1 text-center md:text-left">
                <p className=" text-2xl font-semibold">{`${data?.firstName} ${data?.lastName}`}</p>
                <p className="text-sm text-gray-500">@{data?.email ?? '-'}</p>
              </article>
            </div>

            <div className=" space-x-2 text-center ">
              <Button className="h-9 space-x-1" variant="outline">
                <Icon name="Pen" size={18} />
                <span>Edit profile</span>
              </Button>

              <Button className="h-9 space-x-1">
                <Icon name="Plus" size={18} />
                <span>Add post</span>
              </Button>
            </div>
          </section>
          <hr className="mb-1 mt-4" />
          <UserNavigation userId="jungjung261" />
        </section>
      )}
    </>
  )
}
