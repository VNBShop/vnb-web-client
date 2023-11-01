import Link from 'next/link'

import ProductCard from '@/components/ui/card.product'

import ProductAction from './action'
import ProductHeader from './header'

import {
  BrandProps,
  ProductProps,
  StoreProps,
} from '../../../../types/products'

export type ProductPageProps = {
  title?: string
  desciption?: string
  products: ProductProps[]
  brands?: BrandProps[]
  stores?: StoreProps[]
}

export default function Products({
  title,
  desciption,
  products,
  brands,
  stores,
}: ProductPageProps) {
  return (
    <>
      <section className=" flex flex-col gap-y-4 md:flex-row md:items-end md:justify-between">
        <ProductHeader title={title} desciption={desciption} />
        <ProductAction brands={brands} stores={stores} />
      </section>
      <ul className=" mt-7 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {products && products.length
          ? products.map((product) => {
              return (
                <li key={product.id}>
                  <Link href={`/product/${product.id}`}>
                    <ProductCard
                      name={product.name}
                      image={product.image}
                      price={product.price}
                    />
                  </Link>
                </li>
              )
            })
          : null}
      </ul>
    </>
  )
}
