import { Dispatch, SetStateAction } from 'react'

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { usePostItemContext } from '@/context/post-item'
import { FORUM_SERVICE } from '@/lib/microservice'

import { DataError, DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

export type LikeActionPayload = {
  postId: Post['postId']
  reacted: boolean
}

type IProps = {
  setReact: Dispatch<SetStateAction<boolean>>
  setTotalReaction: Dispatch<SetStateAction<number>>
}

export default function useLikePost({ setReact, setTotalReaction }: IProps) {
  const axios = useAxiosPrivate()
  const client = useQueryClient()

  const { pageKey } = usePostItemContext()

  const { mutate } = useMutation<DataResponse, DataError, LikeActionPayload>({
    mutationFn: async (payload) => {
      return axios.post(`${FORUM_SERVICE}/reactions`, payload)
    },
    onMutate: (payload) => {
      if (payload?.reacted) {
        setReact(false)
        setTotalReaction((prev) => (prev > 0 ? prev - 1 : 0))
      } else {
        setReact(true)
        setTotalReaction((prev) => prev + 1)
      }
    },
    onError: (_err, payload) => {
      if (payload?.reacted) {
        setReact(true)
        setTotalReaction((prev) => prev + 1)
      } else {
        setReact(false)
        setTotalReaction((prev) => (prev > 0 ? prev - 1 : 0))
      }
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: pageKey,
      })
    },
  })

  return {
    onLike: mutate,
  }
}
