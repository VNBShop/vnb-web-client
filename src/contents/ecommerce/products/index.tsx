'use client'
import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import getProducts from '@/api/public/product'
import Empty from '@/common/empty'
import ProductCard from '@/components/ui/card.product'

import ProductAction from './action'
import ProductHeader from './header'

import {
  BrandProps,
  ProductsList,
  StoreProps,
} from '../../../../types/products'

export type ProductPageProps = {
  title?: string
  desciption?: string
  brands?: BrandProps[]
  stores?: StoreProps[]
}

export default function Products({
  title,
  desciption,
  brands,
  stores,
}: ProductPageProps) {
  const { data: productsData } = useQuery<ProductsList>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <>
      <section className=" flex flex-col gap-y-4 md:flex-row md:items-end md:justify-between">
        <ProductHeader title={title} desciption={desciption} />
        <ProductAction brands={brands} stores={stores} />
      </section>
      {!!productsData?.data?.length ? (
        <ul className=" mt-7 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {productsData.data.map((product) => {
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
          })}
        </ul>
      ) : (
        <Empty message="No product" />
      )}
    </>
  )
}
