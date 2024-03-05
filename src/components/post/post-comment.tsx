import { isError } from 'util'

import { CommentItemContext } from '@/context/comment-item'
import { usePostItemContext } from '@/context/post-item'

import useFetchComments from '@/hooks/forum/useFetchComments'

import Avatar from '../avatar'
import PostCommentForm from '../form/post-comment'
import CommentCardSkeleton from '../skeletons/comment-card'
import { Button } from '../ui/button'
import CommnentCard from '../ui/card.comment'

export default function PostComment() {
  const { post } = usePostItemContext()

  const props = useFetchComments({
    postId: post?.postId,
  })

  return (
    <CommentItemContext.Provider value={props}>
      <section className="mt-4 px-4">
        <section className="flex items-start gap-2">
          <Avatar src="/common/avt.jpeg" username="D" />
          <PostCommentForm />
        </section>
        <ul className="mb-7 mt-5 space-y-4">
          {props?.comments?.length &&
          !props?.isError &&
          !props?.isFetching &&
          !props?.isLoading
            ? props?.comments?.map((comment, index) => (
                <CommnentCard
                  postId={post.postId}
                  key={comment?.commentId}
                  comment={comment?.commentContent}
                  name={comment?.commentatorName}
                  avatar={comment?.commentatorAvatar}
                  createAt={comment?.createdAt}
                  isSelf={comment?.yourComment}
                  id={comment?.commentId ?? index}
                />
              ))
            : null}
        </ul>
        {(props?.isFetching || props?.isLoading) && !props?.isError && (
          <CommentCardSkeleton />
        )}

        {props?.isError && (
          <p className="my-10 text-center text-sm text-gray-500">
            This post has no comment yet!
          </p>
        )}

        {props?.hasNextPage &&
          !props?.isError &&
          !props?.isFetching &&
          !props?.isLoading && (
            <section className="mt-7 flex items-center justify-center">
              <Button
                variant="ghost"
                className="text-blue-500 lg:hover:underline"
                onClick={props?.onNextPage}
              >
                Load more...
              </Button>
            </section>
          )}
      </section>
    </CommentItemContext.Provider>
  )
}
