'use client'

import Empty from '@/common/empty'
import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'
import PostCardSkeleton from '@/components/skeletons/post-card'
import { PostFetchContext } from '@/context/post-fetch'
import useFetchPosts from '@/hooks/forum/useFetchPosts'

export default function ForumThreads() {
  const props = useFetchPosts()

  return (
    <PostFetchContext.Provider value={props}>
      <section className="col-span-4 h-full lg:col-span-2 lg:px-10">
        <AddPost />

        <section className="mt-7">
          {props?.posts?.length &&
          !props?.isError &&
          !props?.isFetching &&
          !props?.isLoading
            ? props?.posts?.map((post) => (
                <PostItem key={post?.postId} post={post} />
              ))
            : null}

          {(props?.isFetching || props?.isLoading) && !props?.isError && (
            <PostCardSkeleton />
          )}

          {props?.isError && (
            <Empty
              className="mx-auto mt-16 grid w-[200px]"
              message="No post yet"
            />
          )}
        </section>
      </section>
    </PostFetchContext.Provider>
  )
}
