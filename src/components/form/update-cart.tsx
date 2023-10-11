import Icon from '@/common/icons'

import { carts } from '../drawers/cart.drawer'
import { Input } from '../ui/input'

type UpdateCartForm = (typeof carts)[0]

export default function UpdateCartForm(cart: UpdateCartForm) {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <button>
          <Icon name="Minus" width={18} height={18} />
        </button>

        <Input
          min={0}
          className="text-center h-7 max-w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={cart.quantity}
          inputMode="numeric"
        />

        <button>
          <Icon name="Plus" width={18} height={18} />
        </button>
      </div>

      <button className="ml-3">
        <Icon name="Trash" width={25} height={25} />
      </button>
    </section>
  )
}
