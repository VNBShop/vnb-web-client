import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

import { getProducts } from '@/api/public/product'

import Products from '@/contents/ecommerce/products'

import { BrandProps, ProductStore } from '../../../types/products'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const brands: BrandProps[] = [
    {
      brandId: 1,
      brandName: 'Victor',
    },
    {
      brandId: 2,
      brandName: 'Yonex',
    },
    {
      brandId: 3,
      brandName: 'RSL',
    },
    {
      brandId: 4,
      brandName: 'Carlton',
    },
    {
      brandId: 5,
      brandName: 'Bad M',
    },
    {
      brandId: 6,
      brandName: 'Fz Forza',
    },
    {
      brandId: 7,
      brandName: 'Dunlop',
    },
    {
      brandId: 8,
      brandName: 'Babolat',
    },
    {
      brandId: 9,
      brandName: 'Adidas',
    },
    {
      brandId: 10,
      brandName: 'Slazenger',
    },
    {
      brandId: 12,
      brandName: 'Badminton Nederland',
    },
    {
      brandId: 13,
      brandName: 'Kawasaki',
    },
  ]

  const stores: ProductStore[] = [
    {
      storeId: 1,
      storeName: 'District 1',
    },
    {
      storeId: 2,
      storeName: 'District 2',
    },
    {
      storeId: 3,
      storeName: 'District 3',
    },
    {
      storeId: 4,
      storeName: 'District 4',
    },
    {
      storeId: 5,
      storeName: 'District 5',
    },
    {
      storeId: 6,
      storeName: 'District 6',
    },
    {
      storeId: 7,
      storeName: 'District 7',
    },
    {
      storeId: 8,
      storeName: 'District 8',
    },
    {
      storeId: 9,
      storeName: 'District 9',
    },
    {
      storeId: 10,
      storeName: 'District 10',
    },
    {
      storeId: 11,
      storeName: 'District 11',
    },
    {
      storeId: 12,
      storeName: 'District 12',
    },
    {
      storeId: 13,
      storeName: 'Tan Phu District',
    },
    {
      storeId: 14,
      storeName: 'Tan Binh District',
    },
    {
      storeId: 15,
      storeName: 'Binh Thanh District',
    },
  ]

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({ currentPage: 1 }),
  })

  return (
    <section className="mx-auto mt-10 max-w-main px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Products
          title="Products"
          desciption="Buy products from our stores"
          brands={brands}
          stores={stores}
          filter={searchParams}
        />
      </HydrationBoundary>
    </section>
  )
}
