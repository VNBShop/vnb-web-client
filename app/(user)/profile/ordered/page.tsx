'use client'

import Empty from '@/common/empty'
import Icon from '@/common/icons'
import OrderedCard from '@/components/ordered-card'
import useFetchOrdered from '@/hooks/order/useFetchOrdered'

import { Ordered, OrderedStatus } from '../../../../types/order'

export default function ProfileOrderd() {
  const filter = {
    orderStatus: 'PENDING' as OrderedStatus,
  }
  const { data } = useFetchOrdered({ filter })

  console.log('data', data)

  return (
    <section className="mx-auto mt-10 max-w-[650px]">
      <section className="flex items-center justify-between rounded-md bg-white p-4 py-3 shadow-sm">
        <h2 className="text-lg font-medium">Ordered</h2>
        <div>
          <Icon name="Wallet" size={20} />
        </div>
      </section>

      <section className="mt-7 rounded-md bg-white px-4 py-3 shadow-md">
        {data?.length ? (
          data?.map((orders) =>
            orders.map((ordered: Ordered) => (
              <OrderedCard key={ordered?.orderId} ordered={ordered} />
            ))
          )
        ) : (
          <Empty message="No ordered" />
        )}
      </section>
    </section>
  )
}
