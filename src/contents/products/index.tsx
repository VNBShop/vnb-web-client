import Link from 'next/link'
import ProductCard from '../../components/ui/card.product'
import ProductHeader from './header'
import ProductAction from './action'
import { BrandProps, ProductProps, StoreProps } from '../../../types/products'

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
      <section className=" flex items-end justify-between">
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
