import { useEffect, useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { toast } from 'sonner'

import Icon from '@/common/icons'
import { usePostItemContext } from '@/context/post-item'
import useLikePost from '@/hooks/forum/useLikePost'
import { cn } from '@/lib/utils'

export default function PostInteraction() {
  const { post, onHandleCommentSection } = usePostItemContext()

  const [react, setReact] = useState(false)
  const [totalReaction, setTotalReaction] = useState(0)

  const { onLike } = useLikePost({
    setReact,
    setTotalReaction,
  })

  useEffect(() => {
    if (post?.reacted) {
      setReact(true)
    } else {
      setReact(false)
    }

    if (post?.totalReaction) {
      setTotalReaction(post.totalReaction)
    } else {
      setTotalReaction(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(post)])

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
          <p className=" text-gray-500">{totalReaction ?? 0}</p>
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
              reacted: react,
            })
          }
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-[6px] hover:cursor-pointer lg:hover:bg-gray-100"
        >
          <Icon
            name={react ? 'Heart' : 'HeartOutline'}
            color={react ? '#F36B7E' : ''}
            size={20}
          />
          <span
            className={cn(
              'text-sm font-medium ',
              react ? 'text-[#F36B7E]' : 'text-gray-600'
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

        <CopyToClipboard
          text={`http://localhost:3000/forum/${post?.postId}`}
          onCopy={() => toast.success('Link post has copied!')}
        >
          <div className="flex flex-1 items-center justify-center gap-1 rounded-md py-[6px] hover:cursor-pointer lg:hover:bg-gray-100">
            <Icon name="ShareOutline" size={20} />
            <span className="text-sm font-medium text-gray-600">Share</span>
          </div>
        </CopyToClipboard>
      </section>

      <hr className="mt-1" />
    </section>
  )
}
