import { createContext, useContext } from 'react'

import { QueryKey } from '@tanstack/react-query'

import { Post } from '../../types/forum'

export type PostItemContextProps = {
  post: Post
  onHandleCommentSection: () => void
  pageKey?: QueryKey
  isDetail?: boolean
}

export const PostItemContext = createContext<PostItemContextProps>(
  {} as PostItemContextProps
)

export function usePostItemContext() {
  const context = useContext(PostItemContext)

  if (!context) {
    throw new Error(
      'usePostItemContext must be use in PostItemContextProvider!'
    )
  }

  return context
}
