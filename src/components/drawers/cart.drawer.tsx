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
      className="cart fixed top-0 left-0 bottom-0 right-0 bg-clip-padding bg-opacity-30 bg-gray-100 backdrop-blur-sm z-10"
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
        className="w-[100%] flex flex-col md:w-[70%] lg:w-[40%] absolute top-0 h-full left-0 bottom-0 shadow-md bg-white p-4"
      >
        <section className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Cart</h2>
          <button onClick={() => setCartCont(false)}>
            <Icon name="Xmark" width={25} height={25} />
          </button>
        </section>
        <hr className="my-2" />

        {carts?.length ? (
          <>
            <section className=" overflow-hidden flex flex-1 h-full">
              <section className=" overflow-y-auto w-full">
                <ul className="w-full">
                  {carts.map((cart) => (
                    <li
                      key={cart.id}
                      className="w-full flex md:items-end flex-col gap-y-4 md:flex-row justify-between border-b pb-3 last:border-none"
                    >
                      <figure className="flex items-center gap-2 flex-1">
                        <Image
                          src={cart.image}
                          alt={cart.image}
                          title={cart.name}
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <figcaption className="text-sm space-y-1">
                          <p>{cart.name}</p>
                          <p className="text-gray-500 text-xs">
                            {(100000).toLocaleString()}đ
                          </p>
                          <p className="text-gray-500 text-xs">
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
            <section className="text-sm space-y-2">
              <div className="flex items-center justify-between">
                <p>Shipping:</p>
                <p>Free</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Tax:</p>
                <p>VAT</p>
              </div>

              <div className="flex items-center justify-between !mb-2">
                <p>Total:</p>
                <p>{(100000).toLocaleString()} VND</p>
              </div>

              <Button className="w-full h-9">Checkout</Button>
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
