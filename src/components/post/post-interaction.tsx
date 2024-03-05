import Icon from '@/common/icons'
import { usePostItemContext } from '@/context/post-item'
import useLikePost from '@/hooks/forum/useLikePost'
import { cn } from '@/lib/utils'

export default function PostInteraction() {
  const { post, onHandleCommentSection } = usePostItemContext()
  const { onLike } = useLikePost()
  return (
    <section className="mt-4 px-4">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div
            className={
              'flex h-5 w-5 items-center justify-center rounded-full bg-[#F36B7E]'
            }
          >
            <Icon name="Heart" size={15} color="white" />
          </div>
          <p className=" text-gray-500">{post?.totalReaction ?? 0}</p>
        </div>

        <p className="text-sm text-gray-500">
          {post?.totalComment ?? 0} comments
        </p>
      </section>

      <hr className="mb-1 mt-2" />

      <section className="flex w-full items-center">
        <div
          onClick={() =>
            onLike({
              postId: post.postId,
              reacted: post?.reacted,
            })
          }
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-[6px] hover:cursor-pointer lg:hover:bg-gray-100"
        >
          <Icon
            name={post?.reacted ? 'Heart' : 'HeartOutline'}
            color={post?.reacted ? '#F36B7E' : ''}
            size={20}
          />
          <span
            className={cn(
              'text-sm font-medium ',
              post?.reacted ? 'text-[#F36B7E]' : 'text-gray-600'
            )}
          >
            Like
          </span>
        </div>

        <div
          onClick={onHandleCommentSection}
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-[6px] hover:cursor-pointer lg:hover:bg-gray-100"
        >
          <Icon name="ChatOutline" size={20} />
          <span className="text-sm font-medium text-gray-600">Commnents</span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-1 rounded-md py-[6px] hover:cursor-pointer lg:hover:bg-gray-100">
          <Icon name="ShareOutline" size={20} />
          <span className="text-sm font-medium text-gray-600">Share</span>
        </div>
      </section>

      <hr className="mt-1" />
    </section>
  )
}
