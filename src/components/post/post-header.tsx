import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

import Icon from '@/common/icons'

import { usePostItemContext } from '@/context/post-item'

import PostAction from './post-action'

import Avatar from '../avatar'
dayjs.extend(relativeTime)

export default function PostHeader() {
  const { post } = usePostItemContext()
  return (
    <header className="flex items-center justify-between px-4">
      <section className="flex gap-2">
        <Avatar
          src={post?.postAuthorAvatar ?? ''}
          username={post?.postAuthorName}
        />
        <div>
          <p className="text-sm font-medium">{post?.postAuthorName}</p>
          <p className="text-xs font-light">
            {dayjs(post?.createdAt).fromNow()}
          </p>
        </div>
      </section>

      <div className="flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer lg:hover:bg-gray-100">
        <PostAction />
      </div>
    </header>
  )
}
