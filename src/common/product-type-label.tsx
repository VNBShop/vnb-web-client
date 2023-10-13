export type productTypeLabelProps =
  | 'racket'
  | 'shoes'
  | 'shirt'
  | 'skirt'
  | 'pants'
  | 'bag'
  | 'backpack'
  | 'accessories'
export function productTypeLabel(type: productTypeLabelProps) {
  switch (type) {
    case 'racket':
      return (
        <span className="p-1 px-3 font-medium text-xs rounded-full flex items-center justify-center bg-gray-100 text-black">
          Racket
        </span>
      )
  }
}
