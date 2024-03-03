'use client'

import { useQuery } from '@tanstack/react-query'

import Icon from '@/common/icons'
import ProfileInfoSkeleton from '@/components/skeletons/profile-info'

import { User } from '../../../types/user'

export default function UserInfo() {
  const { data, isLoading, isFetching } = useQuery<User>({
    queryKey: ['get-user-profile'],
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {isFetching || isLoading ? (
        <ProfileInfoSkeleton />
      ) : (
        <section className="space-y-2 bg-white p-4 py-3 md:rounded-md md:shadow-box lg:w-[38%]">
          <h2 className=" font-medium">Information</h2>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Gender" color="#51829B" size={16} />
            <p>{data?.gender ?? '-'}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Icon name="Phone" color="#51829B" size={16} />

            <p>{data?.phoneNumber ?? '-'}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Icon name="Location" color="#51829B" size={16} />

            <p>{data?.address ?? '-'}</p>
          </div>
        </section>
      )}
    </>
  )
}
