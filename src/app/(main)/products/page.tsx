import Products from '@/contents/products'
import type { Metadata } from 'next'

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

  console.log(arr)

  return (
    <section className="mx-auto max-w-main mt-10 px-4">
      <Products
        title="Products"
        desciption="Buy products from our stores"
        products={arr}
      />
    </section>
  )
}
