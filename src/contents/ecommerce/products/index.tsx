'use client'

import { useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { useInView } from 'react-intersection-observer'

import { getProducts } from '@/api/public/product'
import Empty from '@/common/empty'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ui/card.product'

import ProductAction from './action'
import ProductHeader from './header'

import ProductsSkeleton from './skeleton'

import {
  ProductBrand,
  ProductStore,
  Products,
} from '../../../../types/products'

export type ProductPageProps = {
  title?: string
  desciption?: string
  brands?: ProductBrand[]
  stores?: ProductStore[]
  filter: Record<string, string | string[] | undefined>
}

export default function Products({
  title,
  desciption,
  brands,
  stores,
  filter,
}: ProductPageProps) {
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['products', filter],
    queryFn: ({ pageParam: currentPage, queryKey }) =>
      getProducts({ currentPage, filter: queryKey[1] }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Math.ceil(lastPage.total / 10) > allPages.length)
        return allPages.length + 1
      return undefined
    },
    refetchOnWindowFocus: false,
  })

  console.log('re-render products page')

  const products =
    (data?.pages?.flatMap(({ products }) => products) as Products[]) ?? []

  const { ref, inView } = useInView({
    delay: 1000,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  return (
    <>
      <section className=" flex flex-col gap-y-4 md:flex-row md:items-end md:justify-between">
        <ProductHeader title={title} desciption={desciption} />
        <ProductAction brands={brands} stores={stores} />
      </section>
      <ul className=" mt-7 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {!!products?.length && !isError
          ? products.map((product) => (
              <li key={product.productId}>
                <Link href={`/product/${product.productId}`}>
                  <ProductCard
                    name={product.productName}
                    image={product.productImages[0]}
                    price={product.productPrice}
                  />
                </Link>
              </li>
            ))
          : null}
        {(isPending || isFetchingNextPage) && <ProductsSkeleton />}
      </ul>

      {hasNextPage && !isError && !isPending && !isFetchingNextPage && (
        <div ref={ref}></div>
      )}

      {isError && !isPending ? <Empty message="No product" /> : null}
    </>
  )
}
