export type ProductsProps = {
  productId: number
  productName: string
  productImages: string[]
  productPrice: number
}

export type ProductsList = {
  data: ProductsProps[]
  maxPage?: number
  nextPage: number
  currentPage: number
  previousPage?: number
  total: number
}

export type BrandProps = {
  id: number
  name: string
}

export type StoreProps = {
  id: number
  name: string
}
