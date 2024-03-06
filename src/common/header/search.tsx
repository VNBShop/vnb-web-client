'use client'

import { createRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import Image from 'next/image'

import Link from 'next/link'

import { getProducts } from '@/api/public/product'
import { Input } from '@/components/ui/input'
import { Modal, ModalProps } from '@/components/ui/modal'

import { useDebounce } from '@/hooks/useDebounce'

import { Products } from '../../../types/products'
import Empty from '../empty'
import Icon from '../icons'

export default function Search() {
  const modalSearchRef = createRef<ModalProps>()

  const [searchVal, setSearchVal] = useState('')

  const searchValDebounce = useDebounce(searchVal, 1500)

  const { data, isError, isPending } = useQuery({
    queryKey: ['productSearch', searchValDebounce],
    queryFn: async ({ queryKey }) => {
      return await getProducts({
        currentPage: 1,
        pageSize: 7,
        filter: { search: queryKey[1] },
      })
    },
    enabled: !!searchValDebounce,
  })

  console.log('data', data)

  const products: Products[] = data?.products ?? []

  const handleOpenSearchPopup = () => {
    !!modalSearchRef.current && modalSearchRef.current.onOpen()
  }

  return (
    <>
      <div
        className="flex h-9 w-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border lg:w-[200px] lg:justify-normal lg:p-3"
        onClick={handleOpenSearchPopup}
      >
        <Icon name="Search" size={20} color="gray" />
        <span className="hidden text-xs text-gray-500 lg:block">
          Search product...
        </span>
      </div>

      <Modal ref={modalSearchRef} closeOutside>
        <>
          <section className="relative flex items-center">
            <Icon size={22} name="Search" />
            <Input
              placeholder="Search product..."
              className="h-8 flex-1 border-none text-sm"
              autoFocus
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <figure
              className=" absolute right-0 hover:cursor-pointer"
              onClick={() =>
                !!modalSearchRef.current && modalSearchRef.current.onClose()
              }
            >
              <Icon size={22} name="Xmark" />
            </figure>
          </section>

          {!!products?.length ? (
            <section className="mt-4 space-y-4">
              {products.map((product) => {
                return (
                  <Link
                    href={`/product/${product?.productId}`}
                    key={product?.productId}
                    onClick={() =>
                      !!modalSearchRef.current &&
                      modalSearchRef.current.onClose()
                    }
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

          {!products?.length && isPending && !!searchVal ? (
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

          {!isPending && isError && !products?.length && !!searchVal && (
            <Empty className="mx-auto w-[150px]" message="No product found!" />
          )}
        </>
      </Modal>
    </>
  )
}
