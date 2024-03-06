import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import useAxiosPrivate from '@/api/private/hooks/useAxiosPrivate'
import { FORUM_SERVICE, PRODUCT_SERVICE } from '@/lib/microservice'

import { DataResponse } from '../../../types'
import { ProductComment, ProductDetail } from '../../../types/products'

type IProps = {
  productId: ProductDetail['productId']
}

type Filter = {
  page: number
  productId: ProductDetail['productId']
}

export type MetaProductCommentsResponse = {
  data: ProductComment[]
  maxPage: number
  nextPage: number
  currentPage: number
  previousPage: number
  total: number
}

export default function useFetchProductComments({ productId }: IProps) {
  const axios = useAxiosPrivate()
  // const [comments, setCommnets] = useState<ProductComment[]>([])
  const [page, setPage] = useState(1)

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: [
      'get-product-comments',
      {
        productId,
        page,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const filter = queryKey[1] as Filter

      const res: DataResponse = await axios.get(
        `${PRODUCT_SERVICE}/products/comments/products/${filter.productId}`,
        {
          params: {
            currentPage: filter.page,
            pageSize: 5,
          },
        }
      )

      if (res?.data?.success) {
        return res?.data?.metadata as MetaProductCommentsResponse
      } else {
        throw new Error('Cant not fetch this product comments')
      }
    },
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!productId,
  })

  const onNextPage = () => {
    setPage((prev) => prev + 1)
  }

  // useEffect(() => {
  //   if (data?.data) {
  //     setCommnets((prev) => [...prev, ...data?.data])
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(data?.data)])

  return {
    comments: data?.data ?? [],
    isError,
    isFetching,
    isLoading,
    hasNextPage: !!data?.nextPage ?? false,
    onNextPage,
    // setCommnets,
    page,
  }
}
