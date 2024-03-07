'use client'

import { useEffect } from 'react'

import { useInView } from 'react-intersection-observer'

import Empty from '@/common/empty'
import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'
import PostCardSkeleton from '@/components/skeletons/post-card'
import useFetchPosts from '@/hooks/forum/useFetchPosts'

export default function ForumThreads() {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    posts,
  } = useFetchPosts()

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
    <section className="col-span-4 h-full lg:col-span-2 lg:px-10">
      <AddPost pageKey="get-posts" />

      <section className="mt-7">
        {posts.length && !isError
          ? posts?.map((post) => (
              <PostItem key={post?.postId} post={post} pageKey="get-posts" />
            ))
          : null}

        {(isPending || isFetchingNextPage) && <PostCardSkeleton />}

        {(isError || !posts?.length) && !isFetchingNextPage && !isPending && (
          <Empty
            className="mx-auto mt-16 grid w-[200px]"
            message="No post yet"
          />
        )}

        {hasNextPage && !isError && !isPending && !isFetchingNextPage && (
          <div ref={ref}></div>
        )}
      </section>
    </section>
  )
}
