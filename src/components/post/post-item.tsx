import { useState } from 'react'

import { PostItemContext } from '@/context/post-item'

import PostComment from './post-comment'
import PostHeader from './post-header'
import PostInteraction from './post-interaction'
import PostMedia from './post-media'
import PostStatus from './post-status'

import { Post } from '../../../types/forum'

type IProps = {
  post: Post
}
export default function PostItem({ post }: IProps) {
  const [openCommentSection, setOpenCommentSection] = useState(false)

  const onHandleCommentSection = () => {
    setOpenCommentSection((prev) => !prev)
  }
  return (
    <PostItemContext.Provider
      value={{
        post: post,
        onHandleCommentSection,
      }}
    >
      <article className="mb-7 bg-white py-3 md:rounded-md md:shadow-box">
        <PostHeader />
        <PostStatus />
        <PostMedia />
        <PostInteraction />
        {openCommentSection && <PostComment />}
      </article>
    </PostItemContext.Provider>
  )
}
