import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostFetchContext } from '@/context/post-fetch'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

export type LikeActionPayload = {
  postId: Post['postId']
  reacted: boolean
}

export default function useLikePost() {
  const axios = useAxiosPrivate()
  const { setPosts } = usePostFetchContext()
  const { mutate } = useMutation<DataResponse, DataError, LikeActionPayload>({
    mutationFn: async (payload) => {
      return axios.post(`${FORUM_SERVICE}/reactions`, payload)
    },
    onMutate: async (payload) => {
      setPosts((prev) => {
        const findIndex = prev.findIndex(
          (post) => post?.postId === payload?.postId
        )

        if (findIndex !== -1) {
          const newPosts = [...prev]

          newPosts[findIndex] = {
            ...newPosts[findIndex],
            totalReaction: payload?.reacted
              ? newPosts[findIndex]?.totalReaction - 1
              : newPosts[findIndex]?.totalReaction + 1,
            reacted: payload?.reacted ? false : true,
          }

          return newPosts
        }

        return prev
      })
      return {}
    },
  })

  return {
    onLike: mutate,
  }
}
