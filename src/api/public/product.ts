import { axiosProduct } from '../axios/axiosProduct'

export async function getProducts({
  currentPage = 1,
  filter,
}: {
  currentPage?: number
  filter?: any
}) {
  if (filter?.price_range) {
    const splitPrice = filter.price_range.split('-')

    filter = {
      ...filter,
      minPrice: splitPrice[0],
      maxPrice: splitPrice[1],
    }

    delete filter.price_range
  }

  const res = await axiosProduct.get(
    `${process.env.NEXT_PRODUCT_SERVICE}/product`,
    {
      params: {
        currentPage,
        pageSize: 10,
        ...filter,
      },
    }
  )

  if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
    return res?.data?.metadata?.data
  } else {
    throw new Error('')
  }
}

export async function getProductDetail({ id }: { id: number }) {
  const res = axiosProduct.get(
    `${process.env.NEXT_PRODUCT_SERVICE}/product/${id}`
  )

  return res
}
