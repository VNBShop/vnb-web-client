'use client'
import { useRef } from 'react'

import Image from 'next/image'

import Icon from '@/common/icons'
import {
  productTypeLabel,
  productTypeLabelProps,
} from '@/common/product-type-label'
import { Button } from '@/components/ui/button'
import OrderAction from '@/contents/ecommerce/order/order-action'

export default function OrderPage() {
  const deliveryRef = useRef<HTMLDivElement | null>(null)

  const arr = []

  for (let i = 0; i < 10; i++) {
    const fakeData = {
      id: i + 1,
      image: '/common/fake.webp',
      name: `Lining racket HC1200 ${i + 1}`,
      price: Math.floor(Math.random() * 9900001) + 100000,
      quantity: 12,
      type: 'racket',
    }
    arr.push(fakeData)
  }

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[rgba(244,245,250)]" />
      <section className="mx-auto mt-7 max-w-[1000px] bg-white p-4 lg:rounded-md">
        <header>
          <h2 className="text-xl font-medium">Ordering</h2>
          <p className="mt-1 text-gray-500">
            Fill in form to complete your order
          </p>

          <h3
            className="mt-5 inline-flex items-center gap-1 rounded border border-transparent py-1 pr-1"
            ref={deliveryRef}
          >
            <Icon name="Location" size={20} />
            <span>Delivery information</span>
            <OrderAction />
          </h3>
          <section className="ml-1 mt-2 space-y-1 text-sm text-gray-600">
            <p>M Dũng</p>
            <p>(+84) 911710056</p>
            <p>
              Số 175, Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP. Hồ Chí
              Minh
            </p>
          </section>
        </header>
      </section>
      <section className="mx-auto mt-5 max-w-[1000px] bg-white p-4 lg:rounded-md">
        <header>
          <h2 className="text-xl font-medium">Products</h2>
        </header>

        <section className="mt-7 flex h-full flex-col items-start gap-7 lg:flex-row">
          <ul className="w-full space-y-4 lg:w-[60%]">
            {arr.map((cart) => (
              <li
                key={cart.id}
                className="flex justify-between border-b pb-4 last:border-none"
              >
                <figure className="flex gap-2">
                  <Image
                    alt={cart.name}
                    title={cart.name}
                    src={cart.image}
                    width="0"
                    height="0"
                    className="h-full w-[70px] object-contain"
                    sizes="100vw"
                  />

                  <figcaption className="flex-1 space-y-2">
                    <p className="font-medium">{cart.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {cart.quantity}
                    </p>
                    <p className="inline-block">
                      {productTypeLabel(cart.type as productTypeLabelProps)}
                    </p>
                  </figcaption>
                </figure>

                <p className="text-sm text-secondary" suppressHydrationWarning>
                  {(cart.price * cart.quantity).toLocaleString()}đ
                </p>
              </li>
            ))}
          </ul>

          <div className="top-[60px] hidden h-[300px] w-[1px] bg-gray-200 lg:sticky lg:block"></div>

          <article className="top-[80px] -mt-1 w-full flex-1 space-y-3 lg:sticky">
            <div className="flex items-center justify-between text-sm">
              <p>Shiping: </p>
              <p>Free</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p>Tax: </p>
              <p>VAT</p>
            </div>

            <hr />

            <div className="flex items-center justify-between text-sm">
              <p>Total: </p>
              <p className=" font-medium text-secondary">
                {(10000000).toLocaleString()}đ
              </p>
            </div>

            <section className="!mt-7 space-y-4">
              <Button
                className="w-full"
                onClick={() => {
                  if (deliveryRef.current) {
                    deliveryRef.current.style.borderColor = 'red'
                    deliveryRef.current.scrollIntoView({
                      block: 'end',
                      behavior: 'smooth',
                    })
                  }
                }}
              >
                Cash on Delivery
              </Button>
              <p className="text-center text-sm text-gray-600">Or</p>

              <Button variant="outline" className="flex w-full gap-1">
                <Icon name="QR" size={19} />
                <p>
                  <span className="text-red-500">VN</span>
                  <span className="text-blue-500">PAY</span>
                </p>
              </Button>
            </section>
          </article>
        </section>
      </section>
    </>
  )
}
