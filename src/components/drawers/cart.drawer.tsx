import { Dispatch, SetStateAction, memo, useRef } from 'react'

import { Transition } from '@headlessui/react'
import Image from 'next/image'

import Empty from '@/common/empty'
import Icon from '@/common/icons'

import UpdateCartForm from '../form/update-cart'
import { Button } from '../ui/button'

export const carts = [
  {
    id: 123213,
    name: 'Yonex BA261CR Badminton Racket',
    image: '/common/fake.webp',
    quantity: 2,
  },
]

const CartDrawer = ({
  cartCont,
  setCartCont,
}: {
  cartCont: boolean
  setCartCont: Dispatch<SetStateAction<boolean>>
}) => {
  const refCart = useRef<HTMLDivElement | null>(null)

  const handleCloseOutSideCart = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!refCart.current) return

    if (!refCart.current.contains(event.target as Node)) {
      setCartCont(false)
    }
  }
  return (
    <Transition
      show={cartCont}
      className="cart fixed bottom-0 left-0 right-0 top-0 z-10 bg-gray-100 bg-opacity-30 bg-clip-padding backdrop-blur-sm"
      onClick={handleCloseOutSideCart}
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
                      key={cart.id}
                      className="flex w-full flex-col justify-between gap-y-4 border-b pb-3 last:border-none md:flex-row md:items-end"
                    >
                      <figure className="flex flex-1 items-center gap-2">
                        <Image
                          src={cart.image}
                          alt={cart.image}
                          title={cart.name}
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <figcaption className="space-y-1 text-sm">
                          <p>{cart.name}</p>
                          <p className="text-xs text-gray-500">
                            {(100000).toLocaleString()}đ
                          </p>
                          <p className="text-xs text-gray-500">
                            x{cart.quantity}
                          </p>
                        </figcaption>
                      </figure>
                      <UpdateCartForm {...cart} />
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
                <p>Total:</p>
                <p>{(100000).toLocaleString()} VND</p>
              </div>

              <Button className="h-9 w-full">Checkout</Button>
            </section>
          </>
        ) : (
          <Empty message="Your cart is empty" />
        )}
      </Transition.Child>
    </Transition>
  )
}

export default memo(CartDrawer)
