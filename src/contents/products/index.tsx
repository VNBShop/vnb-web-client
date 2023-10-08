import Link from 'next/link'
import { Products } from '../../../types/products'
import ProductCard from '../../components/ui/card.product'
import ProductHeader from './header'
import ProductAction from './action'

export type ProductProps = {
  title?: string
  desciption?: string
  products: Products[]
}

export default function Products({
  title,
  desciption,
  products,
}: ProductProps) {
  return (
    <>
      <section className=" flex items-end justify-between">
        <ProductHeader title={title} desciption={desciption} />
        <ProductAction />
      </section>
      <ul className=" grid gap-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-7">
        {products && products.length
          ? products.map((product) => {
              return (
                <li key={product.id}>
                  <Link href="/">
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
