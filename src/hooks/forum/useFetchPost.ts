import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'

import { FORUM_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { Post } from '../../../types/forum'

type IProps = {
  postId: Post['postId']
}

export default function useFetchPost({ postId }: IProps) {
  const axios = useAxiosPrivate()
  const { data, isPending, isError } = useQuery({
    queryKey: ['get-post', postId],
    enabled: !!postId,
    queryFn: async ({ queryKey }) => {
      const res: DataResponse = await axios.get(
        `${FORUM_SERVICE}/posts/${queryKey[1]}`
      )
      if (res?.data?.success) {
        return res?.data?.metadata
      } else {
        throw new Error('Cant not fetch this post')
      }
    },
  })

  return {
    post: data,
    isPending,
    isError,
  }
}
