'use client'
import { useRef } from 'react'

import Image from 'next/image'

import Icon from '@/common/icons'
import {
  productTypeLabel,
  productTypeLabelProps,
} from '@/common/product-type-label'
import { Button } from '@/components/ui/button'
import OrderAction from '@/contents/order/order-action'

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
      <div className="fixed inset-0 bg-[rgba(244,245,250)] z-[-1]" />
      <section className="max-w-[1000px] mx-auto mt-7 p-4 bg-white rounded-md">
        <header>
          <h2 className="text-xl font-medium">Ordering</h2>
          <p className="mt-1 text-gray-500">
            Fill in form to complete your order
          </p>

          <h3
            className="items-center gap-1 mt-5 border border-transparent py-1 inline-flex pr-1 rounded"
            ref={deliveryRef}
          >
            <Icon name="Location" width={20} height={20} />
            <span>Delivery information</span>
            <OrderAction />
          </h3>
          <section className="text-sm ml-1 space-y-1 text-gray-600 mt-2">
            <p>M Dũng</p>
            <p>(+84) 911710056</p>
            <p>
              Số 175, Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP. Hồ Chí
              Minh
            </p>
          </section>
        </header>
      </section>
      <section className="max-w-[1000px] mx-auto mt-5 p-4 bg-white rounded-md">
        <header>
          <h2 className="text-xl font-medium">Products</h2>
        </header>

        <section className="mt-7 flex gap-7 items-start h-full">
          <ul className="w-[60%] space-y-4">
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
                    className="w-[70px] h-full object-contain"
                    sizes="100vw"
                  />

                  <figcaption className="flex-1 space-y-2">
                    <p className="font-medium">{cart.name}</p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {cart.quantity}
                    </p>
                    <p className="inline-block">
                      {productTypeLabel(cart.type as productTypeLabelProps)}
                    </p>
                  </figcaption>
                </figure>

                <p className="text-secondary text-sm" suppressHydrationWarning>
                  {(cart.price * cart.quantity).toLocaleString()}đ
                </p>
              </li>
            ))}
          </ul>

          <div className="w-[1px] bg-gray-200 h-[300px] lg:sticky top-[60px]"></div>

          <article className="flex-1 lg:sticky top-[80px] -mt-1 space-y-3">
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
              <p className="text-center text-gray-600 text-sm">Or</p>

              <Button variant="outline" className="w-full flex gap-1">
                <Icon name="QR" width={19} height={19} />
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
