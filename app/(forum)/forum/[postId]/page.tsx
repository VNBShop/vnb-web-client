'use client'

import Empty from '@/common/empty'
import PostItem from '@/components/post/post-item'
import PostCardSkeleton from '@/components/skeletons/post-card'

import useFetchPost from '@/hooks/forum/useFetchPost'

import { Post } from '../../../../types/forum'

type IProps = {
  params: {
    postId: Post['postId']
  }
}

export default function PostDetail({ params: { postId } }: IProps) {
  const { isPending, post, isError } = useFetchPost({
    postId,
  })

  if (isError) {
    return <Empty className="mx-auto w-[120px]" message="No post" />
  }

  return (
    <section className=" mx-auto mt-10 max-w-[650px]">
      {!!post && <PostItem isDetail post={post} />}
      {isPending && !post && <PostCardSkeleton length={1} />}
    </section>
  )
}
