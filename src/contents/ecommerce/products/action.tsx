'use client'
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'

import { Menu, Transition } from '@headlessui/react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useDebounce } from '@/hooks/useDebounce'

import { ProductPageProps } from '.'

type ProductActionProps = {
  brands?: ProductPageProps['brands']
  stores?: ProductPageProps['stores']
}

const sorts = [
  {
    id: 1,
    label: 'A-Z',
    value: 'name.asc',
  },
  {
    id: 2,
    label: 'Z-A',
    value: 'name.desc',
  },
  {
    id: 3,
    label: 'Price increasing',
    value: 'price.asc',
  },
  {
    id: 4,
    label: 'Price decreasing',
    value: 'price.desc',
  },
]

export default function ProductAction({ brands, stores }: ProductActionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const brand_ids = searchParams?.get('brandIds')
  const store_ids = searchParams?.get('storeIds')
  const price_range = searchParams?.get('price_range')
  const sort = searchParams?.get('sort')

  const filterContainerRef = useRef<HTMLDivElement>(null)

  const [filterContainer, setFilterContainer] = useState(false)

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [brandIds, setBrandIds] = useState<number[] | null>(
    brand_ids?.split('.').map(Number) ?? null
  )
  const [storeIds, setStoreIds] = useState<number[] | null>(
    store_ids?.split('.').map(Number) ?? null
  )
  const debouncedPrice = useDebounce(priceRange, 500)

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const [min, max] = debouncedPrice
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`
      )
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice])

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          brandIds: brandIds?.length ? brandIds.join('.') : null,
        })}`
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandIds])

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          storeIds: storeIds?.length ? storeIds.join('.') : null,
        })}`
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIds])

  useEffect(() => {
    if (filterContainer) document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = 'unset'
    }
  }, [filterContainer])

  return (
    <>
      <section className="flex items-center gap-2">
        {brand_ids || store_ids || sort || price_range ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', pathname)
              }
              setBrandIds(null)
              setPriceRange([0, 1000])
              setStoreIds(null)
            }}
          >
            Clear filter
          </Button>
        ) : null}

        <Button
          className=" bg-black text-white shadow-none"
          size="sm"
          onClick={() => setFilterContainer(true)}
        >
          Filter
        </Button>
        <Menu as="div" className="relative inline-block">
          <Menu.Button className="flex h-8 items-center gap-1 rounded-md bg-black px-3 text-xs text-white shadow-none">
            Sort <Icon name="ChevronDown" width={18} height={18} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -right-4 top-[120%] z-10 grid min-w-[170px] gap-2 rounded-lg bg-white p-4 shadow-box">
              {sorts.map((item) => (
                <Menu.Item key={item.id} as={Fragment}>
                  <p
                    className={`text-sm hover:cursor-pointer hover:font-medium ${
                      sort === item.value ? 'font-medium' : ''
                    }`}
                    onClick={() =>
                      router.push(
                        `${pathname}?${createQueryString({
                          sort: item.value,
                        })}`
                      )
                    }
                  >
                    {item.label}
                  </p>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
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
          className="absolute bottom-0 left-0 top-0 w-[75%] bg-white p-4 shadow-md md:w-[40%] lg:w-[25%]"
        >
          <section className="flex items-center justify-between border-b pb-4">
            <h3 className=" font-medium md:text-lg">Filters</h3>

            <button onClick={() => setFilterContainer(false)}>
              <Icon name="Xmark" width={25} height={25} />
            </button>
          </section>

          <section className="mb-10 mt-5 h-full space-y-10 overflow-auto pb-10">
            <div className=" space-y-4">
              <h3 className="text-foreground text-sm font-medium tracking-wide">
                Price range ($)
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-hray-500 text-xs">
                  {priceRange[0].toLocaleString()}
                </p>
                <p className="text-hray-500 text-xs">
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <Slider
                variant="range"
                thickness="thin"
                defaultValue={[0, 1000]}
                max={1000}
                step={1}
                value={priceRange}
                onValueChange={(value: typeof priceRange) =>
                  setPriceRange(value)
                }
                disabled={isPending}
              />
            </div>

            {brands && brands.length ? (
              <div className="space-y-4">
                <h3 className="text-foreground text-sm font-medium tracking-wide">
                  Brands
                </h3>

                <ul className="max-h-[240px] space-y-4 overflow-auto">
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

            {stores && stores.length ? (
              <div className="space-y-4">
                <h3 className="text-foreground text-sm font-medium tracking-wide">
                  Store
                </h3>

                <ul className="max-h-[240px] space-y-4 overflow-auto">
                  {stores.map((store) => (
                    <li key={store.storeId} className="flex items-center gap-2">
                      <Checkbox
                        id={`store-${store.storeId}`}
                        checked={storeIds?.includes(store.storeId) ?? false}
                        onCheckedChange={(value) => {
                          if (value) {
                            setStoreIds([...(storeIds ?? []), store.storeId])
                          } else {
                            setStoreIds(
                              storeIds?.filter((id) => id !== store.storeId) ??
                                null
                            )
                          }
                        }}
                      />

                      <Label
                        htmlFor={`store-${store.storeId}`}
                        className="font-normal hover:cursor-pointer"
                      >
                        {store.storeName}
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
