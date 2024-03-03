'use client'

import { useSearchParams } from 'next/navigation'

import Empty from '@/common/empty'
import Icon from '@/common/icons'
import OrderedCard from '@/components/ordered-card'
import OrderedCardSketelon from '@/components/skeletons/ordered-card'
import UserOrderedFilter from '@/contents/profile/ordered-filter'
import useFetchOrdered from '@/hooks/order/useFetchOrdered'

import { Ordered, OrderedStatus } from '../../../../types/order'

export default function ProfileOrderd() {
  const searchParams = useSearchParams()
  const status = searchParams?.get('orderedStatus')

  const filter = {
    status: status as OrderedStatus,
  }
  const { data, isError, isFetching, isLoading } = useFetchOrdered({ filter })

  return (
    <section className="mx-auto mb-10 mt-10 max-w-[650px]">
      <section className="flex items-center justify-between bg-white p-4 py-3 shadow-sm md:rounded-md">
        <h2 className="text-lg font-medium">Ordered</h2>
        <UserOrderedFilter />
      </section>

      <section className="mt-7 space-y-6">
        {data?.length && !isError && !isFetching && !isLoading
          ? data?.map((orders) =>
              orders.map((ordered: Ordered) => (
                <OrderedCard key={ordered?.orderId} ordered={ordered} />
              ))
            )
          : null}

        {(isFetching || isLoading) && !isError && <OrderedCardSketelon />}

        {isError && (
          <Empty className="mx-auto grid w-[100px]" message="No ordered" />
        )}
      </section>
    </section>
  )
}
