'use client'
import { Transition } from '@headlessui/react'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ProductProps } from '.'
import { Checkbox } from '@/components/ui/checkbox'
import { useSearchParams } from 'next/navigation'
import { Label } from '@/components/ui/label'

type ProductActionProps = {
  brands?: ProductProps['brands']
}

export default function ProductAction({ brands }: ProductActionProps) {
  const searchParams = useSearchParams()

  const brand_ids = searchParams?.get('brand_ids')

  const filterContainerRef = useRef<HTMLDivElement>(null)

  const [filterContainer, setFilterContainer] = useState(false)

  const [brandIds, setBrandIds] = useState<number[] | null>(
    brand_ids?.split('.').map(Number) ?? null
  )

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000])

  useEffect(() => {
    if (filterContainer) document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = 'unset'
    }
  }, [filterContainer])

  return (
    <>
      <section className=" flex items-center gap-2">
        <Button size="sm" className=" shadow-none bg-black text-white">
          Sort
        </Button>
        <Button
          className=" shadow-none bg-black text-white"
          size="sm"
          onClick={() => setFilterContainer(true)}
        >
          Filter
        </Button>
      </section>

      <Transition
        show={filterContainer}
        className="fixed inset-0 z-[11] backdrop-blur"
        onClick={(e) => {
          // Close outside
          if (filterContainerRef && filterContainerRef.current) {
            if (!filterContainerRef.current.contains(e.target as Node)) {
              setFilterContainer(false)
            }
          }
        }}
      >
        <Transition.Child
          ref={filterContainerRef}
          enter="transition-all duration-300 ease-in-out"
          enterFrom="opacity-0 -translate-x-[100%]"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-300 ease-in-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-[100%]"
          className="absolute top-0 left-0 bottom-0 overflow-auto lg:w-[25%] w-[75%] md:w-[40%] bg-white p-4 shadow-md"
        >
          <section className="flex items-center justify-between border-b pb-4">
            <h3 className=" font-medium md:text-lg">Filters</h3>

            <button onClick={() => setFilterContainer(false)}>
              <Icon name="Xmark" width={25} height={25} />
            </button>
          </section>

          <section className="mt-5 space-y-10">
            <div className=" space-y-4">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                Price range (VND)
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-xs text-hray-500">
                  {priceRange[0].toLocaleString()}
                </p>
                <p className="text-xs text-hray-500">
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <Slider
                variant="range"
                thickness="thin"
                defaultValue={[0, 20000000]}
                max={20000000}
                step={100}
                value={priceRange}
                onValueChange={(value: typeof priceRange) =>
                  setPriceRange(value)
                }
              />
            </div>

            {brands && brands.length ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Brands
                </h3>

                <ul className="space-y-4 max-h-[240px] overflow-auto">
                  {brands.map((brand) => (
                    <li key={brand.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={brandIds?.includes(brand.id) ?? false}
                        onCheckedChange={(value) => {
                          if (value) {
                            setBrandIds([...(brandIds ?? []), brand.id])
                          } else {
                            setBrandIds(
                              brandIds?.filter((id) => id !== brand.id) ?? null
                            )
                          }
                        }}
                      />

                      <Label
                        htmlFor={`brand-${brand.id}`}
                        className="font-normal hover:cursor-pointer"
                      >
                        {brand.name}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </Transition.Child>
      </Transition>
    </>
  )
}
