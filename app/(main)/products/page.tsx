import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

import { Metadata } from 'next'

import getProducts from '@/api/public/product'
import Empty from '@/common/empty'

import Products from '@/contents/ecommerce/products'

import { BrandProps } from '../../../types/products'

export const meta: Metadata = {
  title: 'Products',
  description: 'Buy products from our stores',
  alternates: {
    canonical: '/products',
  },
}

export default async function ProductsPage() {
  const brands: BrandProps[] = [
    {
      id: 1,
      name: 'VNB',
    },
    {
      id: 2,
      name: 'Yonex',
    },
    {
      id: 3,
      name: 'Lining',
    },
    {
      id: 4,
      name: 'Kawasaki',
    },
    {
      id: 5,
      name: 'Adidas',
    },
  ]

  const stores: BrandProps[] = [
    {
      id: 1,
      name: 'District 1',
    },
    {
      id: 2,
      name: 'District 2',
    },
    {
      id: 3,
      name: 'District 3',
    },
    {
      id: 4,
      name: 'District 4',
    },
    {
      id: 5,
      name: 'District 5',
    },
    {
      id: 6,
      name: 'District 6',
    },
    {
      id: 7,
      name: 'District 7',
    },
    {
      id: 8,
      name: 'District 8',
    },
    {
      id: 9,
      name: 'District 9',
    },
    {
      id: 10,
      name: 'District 10',
    },
    {
      id: 11,
      name: 'District 11',
    },
    {
      id: 12,
      name: 'District 12',
    },
    {
      id: 13,
      name: 'Tan Phu District',
    },
    {
      id: 14,
      name: 'Tan Binh District',
    },
    {
      id: 15,
      name: 'Binh Thanh District',
    },
  ]

  // const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['products'],
  //   queryFn: getProducts,
  // })

  return (
    <section className="mx-auto mt-10 max-w-main px-4">
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <Products
        title="Products"
        desciption="Buy products from our stores"
        brands={brands}
        stores={stores}
      />
      {/* </HydrationBoundary> */}
    </section>
  )
}
