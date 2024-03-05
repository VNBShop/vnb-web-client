import { createContext, useContext } from 'react'

import useFetchPosts from '@/hooks/forum/useFetchPosts'

type PostFetchProps = ReturnType<typeof useFetchPosts>

export const PostFetchContext = createContext<PostFetchProps>(
  {} as PostFetchProps
)

export function usePostFetchContext() {
  const context = useContext(PostFetchContext)
  if (!context) {
    throw new Error(
      'usePostFetchContext must be use in PostFetchContextProvider'
    )
  }

  return context
}
