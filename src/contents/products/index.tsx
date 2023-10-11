import Link from 'next/link'

import ProductAction from './action'
import ProductHeader from './header'

import { BrandProps, ProductProps, StoreProps } from '../../../types/products'
import ProductCard from '../../components/ui/card.product'

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
      <section className=" flex flex-col md:flex-row md:items-end md:justify-between gap-y-4">
        <ProductHeader title={title} desciption={desciption} />
        <ProductAction brands={brands} stores={stores} />
      </section>
      <ul className=" grid gap-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-7">
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
