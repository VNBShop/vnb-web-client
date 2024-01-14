'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'

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
    data: productsData,
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
    getNextPageParam: (lastPage, allPages) => allPages?.length + 1,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <section className=" flex flex-col gap-y-4 md:flex-row md:items-end md:justify-between">
        <ProductHeader title={title} desciption={desciption} />
        <ProductAction brands={brands} stores={stores} />
      </section>
      <ul className=" mt-7 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {!!productsData?.pages?.length
          ? productsData?.pages?.map((products: any) => {
              if (!products?.length) return null
              return products.map((product: Products) => {
                return (
                  <li key={product.productId}>
                    <Link href={`/product/${product.productId}`}>
                      <ProductCard
                        name={product.productName}
                        image={product.productImages[0]}
                        price={product.productPrice}
                      />
                    </Link>
                  </li>
                )
              })
            })
          : null}
        {(isPending || isFetchingNextPage) && <ProductsSkeleton />}
      </ul>

      {hasNextPage && !isError && !isPending && !isFetchingNextPage && (
        <section className="mt-16 flex items-center justify-center">
          <Button variant="outline" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        </section>
      )}

      {isError && !isPending ? <Empty message="No product" /> : null}
    </>
  )
}
