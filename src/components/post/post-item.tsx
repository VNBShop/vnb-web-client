'use client'

import { useState } from 'react'

import { QueryKey } from '@tanstack/react-query'

import { PostItemContext } from '@/context/post-item'

import PostComment from './post-comment'
import PostHeader from './post-header'
import PostInteraction from './post-interaction'
import PostMedia from './post-media'
import PostStatus from './post-status'

import { Post } from '../../../types/forum'

type IProps = {
  post: Post
  pageKey?: QueryKey
  isDetail?: boolean
}
export default function PostItem({ post, pageKey, isDetail }: IProps) {
  const [openCommentSection, setOpenCommentSection] = useState(false)

  const onHandleCommentSection = () => {
    setOpenCommentSection((prev) => !prev)
  }
  return (
    <PostItemContext.Provider
      value={{
        post: post,
        onHandleCommentSection,
        pageKey,
        isDetail,
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
