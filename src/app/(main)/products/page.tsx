import type { Metadata } from 'next'

import Products from '@/contents/products'
import { BrandProps } from '../../../../types/products'

export const meta: Metadata = {
  title: 'Products',
  description: 'Buy products from our stores',
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsPage() {
  const arr = []

  // Sử dụng vòng lặp để tạo và thêm các đối tượng giả mạo vào mảng
  for (let i = 0; i < 10; i++) {
    const fakeData = {
      id: i + 1,
      image: '/common/fake.webp',
      name: `Lining racket HC1200 ${i + 1}`,
      price: Math.floor(Math.random() * 9900001) + 100000, // Tuổi giả mạo từ 20 đến 49
    }
    arr.push(fakeData)
  }

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

  return (
    <section className="mx-auto max-w-main mt-10 px-4">
      <Products
        title="Products"
        desciption="Buy products from our stores"
        products={arr}
        brands={brands}
        stores={stores}
      />
    </section>
  )
}
