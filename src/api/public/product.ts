import { axiosProduct } from '../axios/axiosProduct'

export async function getProducts({
  currentPage = 1,
  pageSize = 10,
  filter,
}: {
  currentPage?: number
  pageSize?: number
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

  const res = await axiosProduct.get('/products', {
    params: {
      currentPage,
      pageSize: pageSize,
      ...filter,
    },
  })

  if (res?.data?.metadata && !!res?.data?.metadata?.data?.length) {
    return res?.data?.metadata?.data
  } else {
    throw new Error('')
  }
}

export async function getProductDetail({ id }: { id: number }) {
  try {
    const res = await axiosProduct.get(`/products/${id}`)

    return res
  } catch (error) {
    console.error('Error fetching or parsing product data:', error)
  }
}
