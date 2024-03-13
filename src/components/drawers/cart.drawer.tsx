import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Transition } from '@headlessui/react'
import Image from 'next/image'

import Empty from '@/common/empty'
import Icon from '@/common/icons'

import Spiner from '@/common/spiner'
import useCreateCart, { CreateCartPayload } from '@/hooks/cart/useCreateCart'
import useDeleteCart from '@/hooks/cart/useDeleteCart'

import { errorFallback } from '../../../public/common'
import { Cart } from '../../../types/order'
import UpdateCartForm from '../form/update-cart'
import { Button } from '../ui/button'

type IProps = {
  cartCont: boolean
  setCartCont: Dispatch<SetStateAction<boolean>>
  carts: Cart[]
}

const CartDrawer = ({ cartCont, setCartCont, carts: cartsOut }: IProps) => {
  const refCart = useRef<HTMLDivElement | null>(null)

  const [carts, setCarts] = useState<Cart[]>([])

  const { loading, onAddToCart } = useCreateCart({
    isMultiple: true,
    onCloseDrawer: () => setCartCont(false),
  })

  const onCloseOutSideCart = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!refCart.current) return

    if (!refCart.current.contains(event.target as Node)) {
      setCartCont(false)
    }
  }

  const onCheckout = () => {
    const payload: CreateCartPayload[] = carts.map((item) => ({
      productSizeId: item?.productSizeId,
      quantity: item?.quantity,
    }))

    onAddToCart(payload as CreateCartPayload[])
  }

  useEffect(() => {
    if (cartsOut?.length) {
      setCarts(cartsOut)
    } else {
      setCarts([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cartsOut), cartCont])

  return (
    <Transition
      show={cartCont}
      className="cart fixed bottom-0 left-0 right-0 top-0 z-10 bg-gray-100 bg-opacity-30 bg-clip-padding backdrop-blur-sm"
      onClick={onCloseOutSideCart}
    >
      <Transition.Child
        ref={refCart}
        enter="transition-all duration-300 ease-in-out"
        enterFrom="opacity-0 -translate-x-[100%]"
        enterTo="opacity-100 translate-x-0"
        leave="transition-all duration-300 ease-in-out"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-[100%]"
        className="absolute bottom-0 left-0 top-0 flex h-full w-[100%] flex-col bg-white p-4 shadow-md md:w-[70%] lg:w-[40%]"
      >
        <section className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Cart</h2>
          <button onClick={() => setCartCont(false)}>
            <Icon name="Xmark" size={25} />
          </button>
        </section>
        <hr className="my-2" />

        {carts?.length ? (
          <>
            <section className=" flex h-full flex-1 overflow-hidden">
              <section className=" w-full overflow-y-auto">
                <ul className="w-full">
                  {carts.map((cart) => (
                    <li
                      key={cart?.cartId}
                      className="flex w-full flex-col justify-between gap-y-4 border-b pb-3 last:border-none md:flex-row md:items-end"
                    >
                      <figure className="flex flex-1 items-center gap-2">
                        <Image
                          src={cart?.productImage ?? errorFallback}
                          alt={cart?.productName}
                          title={cart?.productName}
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <figcaption className="space-y-1 text-sm">
                          <p>{cart?.productName}</p>
                          <p className="text-xs text-gray-500">
                            {cart?.productPriceUnit?.toLocaleString('vn-VN', {
                              currency: 'VND',
                              style: 'currency',
                            })}
                            đ
                          </p>
                          <p className="text-xs text-gray-500">
                            x{cart.quantity}
                          </p>
                        </figcaption>
                      </figure>
                      <UpdateCartForm cart={cart} setCarts={setCarts} />
                    </li>
                  ))}
                </ul>
              </section>
            </section>

            <hr className="mb-4" />
            <section className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <p>Shipping:</p>
                <p>Free</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Tax:</p>
                <p>VAT</p>
              </div>

              <div className="!mb-2 flex items-center justify-between">
                <p>Total temp:</p>
                <p className="font-medium text-secondary">
                  {carts
                    ?.reduce(
                      (acc, curr) =>
                        acc + curr?.productPriceUnit * curr?.quantity,
                      0
                    )
                    ?.toLocaleString('vi-VI', {
                      currency: 'VND',
                      style: 'currency',
                    })}
                </p>
              </div>

              <Button
                onClick={onCheckout}
                disabled={loading}
                className="h-11 w-full space-x-1"
              >
                {loading && <Spiner size={16} />}
                <span>Checkout</span>
              </Button>
            </section>
          </>
        ) : (
          <Empty
            className="mx-auto my-auto w-[150px]"
            message="Your cart is empty"
          />
        )}
      </Transition.Child>
    </Transition>
  )
}

export default memo(CartDrawer)
