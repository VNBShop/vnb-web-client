import axios from 'axios'

export default async function getProducts() {
  const res = await axios.get(
    `${process.env.NEXT_PRODUCT_SERVICE}/product?currentPage=1&pageSize=10`
  )

  console.log('>>res?.data?.metadata', res)

  return res?.data?.metadata ?? {}
}
