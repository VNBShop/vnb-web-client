import Empty from '@/common/empty'
import { usePostItemContext } from '@/context/post-item'

import useFetchComments from '@/hooks/forum/useFetchComments'

import { Comment } from '../../../types/forum'
import Avatar from '../avatar'
import PostCommentForm from '../form/post-comment'
import CommentCardSkeleton from '../skeletons/comment-card'
import { Button } from '../ui/button'
import CommnentCard from '../ui/card.comment'

const comments = [
  {
    id: 1231,
    userId: '12das2',
    userName: 'Dzung',
    userAvatar: '/common/fake.webp',
    content: 'Norman: Best racket',
  },
  {
    id: 2121,
    userId: 'csaa232',
    userName: 'Khang Leo',
    content: 'Ugly racket',
  },
]

export default function PostComment() {
  const { post } = usePostItemContext()

  const {
    data,
    isError,
    isFetching,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchComments({
    postId: post?.postId,
  })

  return (
    <section className="mt-4 px-4">
      <section className="flex items-start gap-2">
        <Avatar src="/common/avt.jpeg" username="D" />
        <PostCommentForm postId={post?.postId} />
      </section>
      <ul className="mb-7 mt-5 space-y-4">
        {data?.length && !isError && !isFetching && !isLoading
          ? data?.map(
              (comments) =>
                comments?.map((comment: Comment) => (
                  <CommnentCard
                    postId={post.postId}
                    key={comment?.commentId}
                    comment={comment?.commentContent}
                    name={comment?.commentatorName}
                    avatar={comment?.commentatorAvatar}
                    createAt={comment?.createdAt}
                    isSelf={comment?.yourComment}
                    id={comment.commentId}
                  />
                ))
            )
          : null}
      </ul>
      {(isFetching || isLoading) && !isError && <CommentCardSkeleton />}

      {isError && (
        <p className="my-10 text-center text-sm text-gray-500">
          This post has no comment yet!
        </p>
      )}

      {hasNextPage &&
        !isError &&
        !isFetching &&
        !isLoading &&
        isFetchingNextPage && (
          <section className="mt-7 flex items-center justify-center">
            <Button
              variant="ghost"
              className="text-blue-500 lg:hover:underline"
              onClick={() => fetchNextPage()}
            >
              Load more...
            </Button>
          </section>
        )}
    </section>
  )
}
