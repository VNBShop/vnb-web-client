import Icon from '@/common/icons'

import { carts } from '../drawers/cart.drawer'
import { Input } from '../ui/input'

type UpdateCartForm = (typeof carts)[0]

export default function UpdateCartForm(cart: UpdateCartForm) {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <button>
          <Icon name="Minus" size={18} />
        </button>

        <Input
          min={0}
          className="h-7 max-w-[50px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          value={cart.quantity}
          inputMode="numeric"
        />

        <button>
          <Icon name="Plus" size={18} />
        </button>
      </div>

      <button className="ml-3">
        <Icon name="Trash" size={25} />
      </button>
    </section>
  )
}
