'use client'

import { useEffect } from 'react'

import { useInView } from 'react-intersection-observer'

import Empty from '@/common/empty'
import PostItem from '@/components/post/post-item'
import PostCardSkeleton from '@/components/skeletons/post-card'
import useFetchUserPosts from '@/hooks/user/useFetchUserPosts'

export default function ProfilePosts() {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    posts,
  } = useFetchUserPosts()
  const { ref, inView } = useInView({
    delay: 1000,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  return (
    <section className="mt-7">
      {posts.length && !isError
        ? posts?.map((post) => (
            <PostItem
              key={post?.postId}
              post={post}
              pageKey={['get-posts-profile']}
            />
          ))
        : null}

      {(isPending || isFetchingNextPage) && <PostCardSkeleton />}

      {(isError || !posts?.length) && !isFetchingNextPage && !isPending && (
        <Empty className="mx-auto mt-16 grid w-[200px]" message="No post yet" />
      )}

      {hasNextPage && !isError && !isPending && !isFetchingNextPage && (
        <div ref={ref}></div>
      )}
    </section>
  )
}
