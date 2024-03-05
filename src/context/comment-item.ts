import { createContext, useContext } from 'react'

import useFetchComments from '@/hooks/forum/useFetchComments'

type CommentItemProps = ReturnType<typeof useFetchComments>

export const CommentItemContext = createContext<CommentItemProps>(
  {} as CommentItemProps
)

export function useCommentItemContext() {
  const context = useContext(CommentItemContext)

  if (!context) {
    throw new Error('useCommentItemContext must be use in CommentItemProvider')
  }

  return context
}
