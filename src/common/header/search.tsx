'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import Image from 'next/image'

import Link from 'next/link'

import { isError } from 'util'

import { getProducts } from '@/api/public/product'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'

import { useDebounce } from '@/hooks/useDebounce'

import { Products } from '../../../types/products'
import Empty from '../empty'
import Icon from '../icons'

export default function Search() {
  const [searchPopup, setSearchPopup] = useState(false)

  const [searchVal, setSearchVal] = useState('')

  const searchValDebounce = useDebounce(searchVal, 1500)

  const { data, isError, isPending } = useQuery<Products[]>({
    queryKey: ['productSearch', searchValDebounce],
    queryFn: ({ queryKey }) =>
      getProducts({
        currentPage: 1,
        pageSize: 7,
        filter: { search: queryKey[1] },
      }),
    enabled: !!searchValDebounce,
  })

  const handleOpenSearchPopup = () => {
    setSearchPopup((prev) => !prev)
  }

  return (
    <>
      <div
        className="flex h-9 w-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border lg:w-[200px] lg:justify-normal lg:p-3"
        onClick={handleOpenSearchPopup}
      >
        <Icon name="Search" width={20} height={20} color="gray" />
        <span className="hidden text-xs text-gray-500 lg:block">
          Search product...
        </span>
      </div>

      <Modal
        show={searchPopup}
        close={() => setSearchPopup(false)}
        closeOutside
      >
        <>
          <section className="relative flex items-center">
            <Icon width={22} height={22} name="Search" />
            <Input
              placeholder="Search product..."
              className="h-8 flex-1 border-none text-sm"
              autoFocus
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <figure
              className=" absolute right-0 hover:cursor-pointer"
              onClick={() => setSearchPopup(false)}
            >
              <Icon width={22} height={22} name="Xmark" />
            </figure>
          </section>

          {!!data?.length ? (
            <section className="mt-4 space-y-4">
              {data.map((product) => {
                return (
                  <Link
                    href={`/product/${product?.productId}`}
                    key={product?.productId}
                    onClick={() => setSearchPopup(false)}
                    className="flex items-center gap-2 rounded-md p-1 lg:hover:cursor-pointer lg:hover:bg-slate-100"
                  >
                    <figure className="h-[55px] w-[55px] rounded-full border border-gray-100">
                      <Image
                        width={0}
                        height={0}
                        src={product?.productImages?.[0]}
                        alt={product?.productName}
                        sizes="100vw"
                        className="h-full w-full rounded-full object-cover [image-rendering:_pixelated]"
                      />
                    </figure>

                    <section>
                      <p className="text-[15px]">{product?.productName}</p>
                      <p className="text-sm text-secondary">
                        {product?.productPrice?.toLocaleString('en-EN', {
                          currency: 'USD',
                          style: 'currency',
                        })}
                      </p>
                    </section>
                  </Link>
                )
              })}
            </section>
          ) : null}

          {!data?.length && isPending && !!searchVal ? (
            <section className="mt-4 space-y-4">
              {Array.from({ length: 7 }).map((item, index) => {
                return (
                  <article
                    key={index}
                    className="flex animate-pulse items-center gap-2 "
                  >
                    <div className="h-[55px] w-[55px] rounded-full bg-gray-200" />

                    <div className=" space-y-2">
                      <div className="h-4 w-[200px] rounded-lg bg-gray-200" />
                      <div className="h-4 w-[100px] rounded-lg bg-gray-200" />
                    </div>
                  </article>
                )
              })}
            </section>
          ) : null}

          {!isPending && isError && !data?.length && !!searchVal && (
            <Empty className="mx-auto w-[150px]" message="No product found!" />
          )}
        </>
      </Modal>
    </>
  )
}
