import { SetStateAction } from 'react'

import numeral from 'numeral'

import Icon from '@/common/icons'

import Spiner from '@/common/spiner'
import useDeleteCart from '@/hooks/cart/useDeleteCart'

import { Cart } from '../../../types/order'
import { Input } from '../ui/input'

type IProps = {
  cart: Cart
  setCarts: (value: SetStateAction<Cart[]>) => void
}

export default function UpdateCartForm({ cart, setCarts }: IProps) {
  const { loading, onDeleteCart } = useDeleteCart()

  const onDecrease = () => {
    setCarts((prev) => {
      const find = prev.findIndex((item) => item?.cartId === cart.cartId)

      if (find !== -1) {
        const newCarts = [...prev]
        newCarts[find] = {
          ...newCarts[find],
          quantity: newCarts[find].quantity - 1,
        }

        return newCarts
      }

      return prev
    })
  }

  const onIncrease = () => {
    setCarts((prev) => {
      const find = prev.findIndex((item) => item?.cartId === cart.cartId)

      if (find !== -1) {
        const newCarts = [...prev]
        newCarts[find] = {
          ...newCarts[find],
          quantity: newCarts[find].quantity + 1,
        }
        return newCarts
      }

      return prev
    })
  }

  const onInputChange = (value: string) => {
    setCarts((prev) => {
      const find = prev.findIndex((item) => item?.cartId === cart.cartId)

      if (find !== -1) {
        const newCarts = [...prev]
        newCarts[find] = {
          ...newCarts[find],
          quantity: numeral(value).value() as number,
        }

        return newCarts
      }

      return prev
    })
  }

  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <button disabled={cart?.quantity < 2} onClick={onDecrease}>
          <Icon name="Minus" size={18} />
        </button>

        <Input
          min={1}
          className="h-7 max-w-[70px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          value={cart.quantity}
          onChange={(e) => onInputChange(e.target.value)}
          inputMode="numeric"
        />

        <button onClick={onIncrease}>
          <Icon name="Plus" size={18} />
        </button>
      </div>

      {loading ? (
        <Spiner size={18} />
      ) : (
        <button
          className="ml-3 lg:hover:text-danger"
          onClick={() => {
            if (!cart?.cartId) return
            onDeleteCart({
              id: cart.cartId,
            })
          }}
        >
          <Icon name="Trash" size={25} />
        </button>
      )}
    </section>
  )
}
