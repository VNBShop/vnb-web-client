'use client'

import Empty from '@/common/empty'
import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'
import useFetchPosts from '@/hooks/forum/useFetchPosts'

import { Post } from '../../../../types/forum'

export default function ForumThreads() {
  const { data, isError, isFetching, isFetchingNextPage, isLoading } =
    useFetchPosts()

  return (
    <section className="col-span-4 h-full lg:col-span-2 lg:px-10">
      <AddPost />

      <section className="mt-7">
        {data?.length && !isError && !isFetching && !isLoading
          ? data?.map((orders) =>
              orders.map((post: Post) => (
                <PostItem key={post?.postId} post={post} />
              ))
            )
          : null}

        {/* {(isFetching || isLoading) && !isError && <OrderedCardSketelon />} */}

        {isError && (
          <Empty className="mx-auto grid w-[200px]" message="No ordered" />
        )}
      </section>
    </section>
  )
}
