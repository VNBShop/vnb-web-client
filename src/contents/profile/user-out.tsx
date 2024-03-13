'use client'

import { useEffect } from 'react'

import dayjs from 'dayjs'
import Link from 'next/link'

import { notFound } from 'next/navigation'

import { useInView } from 'react-intersection-observer'

import Empty from '@/common/empty'
import Icon from '@/common/icons'
import Avatar from '@/components/avatar'
import PostItem from '@/components/post/post-item'
import PostCardSkeleton from '@/components/skeletons/post-card'
import ProfileHeaderSkeleton from '@/components/skeletons/profile-header'
import ProfileInfoSkeleton from '@/components/skeletons/profile-info'
import { Button } from '@/components/ui/button'
import useFetchUserAcc from '@/hooks/user/useFetchUserAcc'
import useFetchUserPostsAcc from '@/hooks/user/useFetchUserPostsAcc'

type IProps = {
  userId: string
}

export default function UserOutProfile({ userId }: IProps) {
  const { loading, userAccount, isError } = useFetchUserAcc({
    userId,
  })

  const {
    fetchNextPage,
    hasNextPage,
    isError: postError,
    isFetchingNextPage,
    isPending,
    posts,
  } = useFetchUserPostsAcc({
    userId,
  })

  const { ref, inView } = useInView({
    delay: 1000,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  if (isError) {
    return notFound()
  }

  return (
    <>
      {loading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <section className="mx-auto mb-7 w-full max-w-secondary border-b px-4 pb-12">
          <section className="mt-7 flex flex-col items-center justify-between gap-y-4 md:flex-row md:items-end">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <div className=" relative rounded-full">
                <Avatar
                  src={userAccount?.avatar ?? ''}
                  username={
                    userAccount?.firstName ??
                    userAccount?.lastName ??
                    userAccount?.email ??
                    'Z'
                  }
                  className="h-[110px] w-[110px]"
                  nameSize={36}
                />
              </div>

              <article className=" space-y-1 text-center md:text-left">
                <p className=" text-2xl font-semibold">
                  {userAccount?.firstName && userAccount?.lastName
                    ? `${userAccount?.firstName} ${userAccount?.lastName}`
                    : userAccount?.email}
                </p>
                <p className="text-sm text-gray-500">
                  @{userAccount?.email ?? '-'}
                </p>
              </article>
            </div>

            <div className=" space-x-2 text-center ">
              <Link href={`/conversation/${userId}`} passHref>
                <Button className="h-9 space-x-1 bg-white text-black hover:bg-transparent">
                  <Icon name="Messenger" size={18} />
                  <span>Messenger</span>
                </Button>
              </Link>
            </div>
          </section>
        </section>
      )}
      <section className="mx-auto mt-7 flex max-w-secondary flex-col gap-4 md:px-4 lg:flex-row lg:items-start">
        {loading ? (
          <ProfileInfoSkeleton />
        ) : (
          <section className="space-y-2 bg-white p-4 py-3 md:rounded-md md:shadow-box lg:w-[38%]">
            <h2 className=" font-medium">Information</h2>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Gender" color="#51829B" size={16} />
              <p>{userAccount?.gender ?? '-'}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Icon name="Birthday" color="#51829B" size={16} />

              <p>
                {userAccount?.dateOfBirth
                  ? dayjs(userAccount.dateOfBirth).format('DD/MM/YYYY')
                  : '-'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Icon name="Phone" color="#51829B" size={16} />

              <p>{userAccount?.phoneNumber ?? '-'}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Icon name="Location" color="#51829B" size={16} />

              <p>{userAccount?.address ?? '-'}</p>
            </div>
          </section>
        )}

        <section className="flex-1">
          {posts.length && !postError
            ? posts?.map((post) => (
                <PostItem
                  key={post?.postId}
                  post={post}
                  pageKey={['get-posts-user-acc', userId]}
                />
              ))
            : null}

          {(isPending || isFetchingNextPage) && <PostCardSkeleton />}

          {(postError || !posts?.length) &&
            !isFetchingNextPage &&
            !isPending && (
              <Empty
                className="mx-auto mt-16 grid w-[100px]"
                message="No post yet"
              />
            )}

          {hasNextPage && !postError && !isPending && !isFetchingNextPage && (
            <div ref={ref}></div>
          )}
        </section>
      </section>
    </>
  )
}
