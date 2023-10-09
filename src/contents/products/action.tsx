'use client'
import { Menu, Transition } from '@headlessui/react'
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useDebounce } from '@/hooks/useDebounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

  const brand_ids = searchParams?.get('brand_ids')
  const store_ids = searchParams?.get('store_ids')
  const price_range = searchParams?.get('price_range')
  const sort = searchParams?.get('sort')

  const filterContainerRef = useRef<HTMLDivElement>(null)

  const [filterContainer, setFilterContainer] = useState(false)

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000])
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
          brand_ids: brandIds?.length ? brandIds.join('.') : null,
        })}`
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandIds])

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          store_ids: storeIds?.length ? storeIds.join('.') : null,
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
      <section className=" flex items-center gap-2">
        {brand_ids || store_ids || sort || price_range ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', pathname)
              }
              setBrandIds(null)
              setPriceRange([0, 20000000])
              setStoreIds(null)
            }}
          >
            Clear filter
          </Button>
        ) : null}

        <Button
          className=" shadow-none bg-black text-white"
          size="sm"
          onClick={() => setFilterContainer(true)}
        >
          Filter
        </Button>
        <Menu as="div" className="relative inline-block">
          <Menu.Button className="h-8 rounded-md px-3 text-xs flex items-center gap-1 shadow-none bg-black text-white">
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
            <Menu.Items className="absolute top-[120%] grid gap-2 rounded-lg p-4 bg-white shadow-box z-10 min-w-[170px] -right-4">
              {sorts.map((item) => (
                <Menu.Item key={item.id} as={Fragment}>
                  <p
                    className={`hover:cursor-pointer text-sm hover:font-medium ${
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
          className="absolute top-0 left-0 bottom-0 lg:w-[25%] w-[75%] md:w-[40%] bg-white p-4 shadow-md"
        >
          <section className="flex items-center justify-between border-b pb-4">
            <h3 className=" font-medium md:text-lg">Filters</h3>

            <button onClick={() => setFilterContainer(false)}>
              <Icon name="Xmark" width={25} height={25} />
            </button>
          </section>

          <section className="mt-5 space-y-10 h-full overflow-auto mb-10 pb-10">
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
                disabled={isPending}
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

            {stores && stores.length ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Store
                </h3>

                <ul className="space-y-4 max-h-[240px] overflow-auto">
                  {stores.map((store) => (
                    <li key={store.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`store-${store.id}`}
                        checked={storeIds?.includes(store.id) ?? false}
                        onCheckedChange={(value) => {
                          if (value) {
                            setStoreIds([...(storeIds ?? []), store.id])
                          } else {
                            setStoreIds(
                              storeIds?.filter((id) => id !== store.id) ?? null
                            )
                          }
                        }}
                      />

                      <Label
                        htmlFor={`store-${store.id}`}
                        className="font-normal hover:cursor-pointer"
                      >
                        {store.name}
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
