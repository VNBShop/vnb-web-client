import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { colorsOrderedStatus } from '@/lib/contants'

import { cn } from '@/lib/utils'

import { Ordered, OrderedStatus, ProductOrdered } from '../../types/order'

dayjs.extend(relativeTime)

type IProps = {
  ordered: Ordered
}

export default function OrderedCard({ ordered }: IProps) {
  const router = useRouter()
  return (
    <section className="w-full bg-white px-4 py-3 shadow-sm md:rounded-md">
      <section className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {dayjs(ordered?.orderDate).fromNow()}
        </p>

        <div
          className="rounded-full  px-3 py-1 text-[13px] font-medium lowercase first-letter:uppercase"
          style={{
            backgroundColor:
              colorsOrderedStatus[ordered?.orderStatus]?.backgroundColor,
            color: colorsOrderedStatus[ordered?.orderStatus]?.color,
          }}
        >
          {ordered?.orderStatus}
        </div>
      </section>

      <div className="my-3 h-[1px] w-full bg-gray-200"></div>

      <section className="w-ful">
        {ordered?.products?.map((prod: ProductOrdered) => (
          <article
            key={prod?.productId}
            className="flex w-full items-center justify-between"
          >
            <section className="flex items-center gap-4">
              <figure
                className="group relative h-[100px] w-[100px] overflow-hidden rounded-md hover:cursor-pointer"
                onClick={() =>
                  router.push(`/product/${prod?.productId}`, {
                    scroll: false,
                  })
                }
              >
                <Image
                  src={prod?.productImage}
                  alt={prod?.productName}
                  title={prod?.productName}
                  fill
                  className=" object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
                  sizes="100vw"
                />
              </figure>

              <section className="space-y-1">
                <p
                  className="text-[15px] font-medium text-gray-700 hover:underline"
                  onClick={() =>
                    router.push(`/product/${prod?.productId}`, {
                      scroll: false,
                    })
                  }
                >
                  {prod?.productName}
                </p>
                {!!prod?.productSizeName && (
                  <p className={cn('w-fit rounded border p-1 text-xs')}>
                    {prod?.productSizeName}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  x{prod?.quantity ?? '0'}
                </p>
              </section>
            </section>

            <p className="text-sm font-medium text-secondary">
              {prod?.priceUnit?.toLocaleString('vi-VI', {
                currency: 'VND',
                style: 'currency',
              })}
            </p>
          </article>
        ))}
      </section>

      <div className="my-3 h-[1px] w-full bg-gray-200"></div>

      <section className="flex items-start justify-between ">
        <div className="text-xs text-gray-500">
          {dayjs(ordered?.orderDate).format('HH:mm:ss DD/MM/YYYY')}
        </div>

        <section className="space-y-2 text-right text-sm">
          <p className="text-sm text-gray-700">
            {' '}
            Payment type: {ordered?.paymentType}
          </p>
          <p className="font-medium text-secondary">
            Total:{' '}
            {ordered?.totalPrice?.toLocaleString('vi-VI', {
              currency: 'VND',
              style: 'currency',
            })}
          </p>
        </section>
      </section>
    </section>
  )
}
