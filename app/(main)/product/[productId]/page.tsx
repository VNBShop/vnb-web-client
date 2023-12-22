import Image from 'next/image'

import { notFound } from 'next/navigation'

import Icon from '@/common/icons'
import { Breadcrumbs } from '@/components/breadcrumbs'
import AddToCardForm from '@/components/form/add-to-card'
import CommentForm from '@/components/form/product-comment'
import CommnentCard from '@/components/ui/card.comment'

import { ProductDetail } from '../../../../types/products'

type ProductPageProps = {
  params: {
    productId: string
  }
}

type ProductDetailResponse = {
  metadata: ProductDetail
  success: boolean
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = Number(params?.productId)

  const res = await fetch(`${process.env.NEXT_PRODUCT_SERVICE}/product/${id}`)

  const result: ProductDetailResponse = await res.json()

  if (!result.success) {
    notFound()
  }

  const product = result?.metadata

  return (
    <section className="mx-auto mt-5 max-w-main space-y-7 px-4">
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Products',
            href: '/products',
          },
          {
            title: product.productName,
            href: `/product/${product.productId}`,
          },
        ]}
      />

      <section className="flex flex-col items-start gap-7 lg:flex-row">
        <section className="flex w-full flex-col items-start gap-7 lg:w-[75%]">
          <section className="flex w-full flex-col items-start gap-x-10 lg:flex-row">
            <figure className="w-full lg:w-[45%]">
              <Image
                src={product?.productImages[0]}
                alt={product?.productName}
                title={product?.productName}
                width="0"
                height="0"
                className=" aspect-square w-full object-cover"
                sizes="100vw"
              />
            </figure>

            <article className="w-full flex-1 space-y-3">
              <h1 className="text-2xl font-medium">{product?.productName}</h1>

              <h2 className="text-sm">
                Code:{' '}
                <span className="text-secondary">{params?.productId}</span>
              </h2>

              <div className="flex items-center gap-2 text-sm">
                <h2>
                  Brand:{' '}
                  <span className=" text-secondary">
                    {product?.productBrand}
                  </span>
                </h2>
                <div className="h-4 w-[1px] bg-gray-500" />
                <h2>
                  Status:{' '}
                  {!!product?.productStatus ? (
                    <span className="text-secondary">
                      {product?.productStatus}
                    </span>
                  ) : (
                    <span className="text-gray-600">Not available</span>
                  )}
                </h2>
              </div>

              <div className="flex items-end gap-4">
                <h2 className="text-xl font-medium text-secondary">
                  {product?.productPrice?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </h2>
                <p className=" text-gray-400 ">
                  SRP:{' '}
                  {product?.productPrice ? (
                    <span className=" line-through">
                      {(
                        product?.productPrice +
                        product?.productPrice * 0.1
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  ) : (
                    0
                  )}
                </p>
              </div>

              <ul className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <li key={index}>
                    <Icon
                      name="Star"
                      width={18}
                      height={18}
                      color={
                        product?.productRating
                          ? item <= Math.round(product.productRating)
                            ? '#FF9529'
                            : '#B4B4B3'
                          : '#FF9529'
                      }
                    />
                  </li>
                ))}
              </ul>
              {/*
              <div className="relative !my-7 rounded-md border border-dashed p-4">
                <ul className="space-y-3">
                  {product.endows.map((endow, index) => (
                    <li
                      className="flex items-start gap-2 text-sm text-gray-600"
                      key={index}
                    >
                      <Icon name="Checked" width={20} height={20} /> {endow}
                      {endow}
                    </li>
                  ))}
                </ul>
                <figure className="absolute -top-4 right-2">
                  <Icon name="Endow" color="#ff2461" width={27} height={27} />
                </figure>
              </div> */}
              {!!Object.keys(product?.productDetail)?.length ? (
                <ul className="!mb-10">
                  {Object.entries(product.productDetail).map(
                    ([key, value], index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center gap-1 text-sm leading-[24px] text-gray-500"
                        >
                          <p>{key}</p>:{' '}
                          <p className=" font-medium text-gray-600">{value}</p>
                        </li>
                      )
                    }
                  )}
                </ul>
              ) : null}

              <AddToCardForm />
            </article>
          </section>
          <hr className="w-full" />
          <section className="mt-4 w-full">
            <CommentForm />

            <ul className="mt-10 max-w-[500px] space-y-7">
              {!!product?.productComments?.length ? (
                product.productComments.map((comment, index) => (
                  <li key={index}>
                    <CommnentCard
                      comment={comment.comment}
                      name={comment.commenterName}
                      avatar={comment.commenterAvatar}
                    />
                  </li>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">
                  This product didnt have comment yet!
                </p>
              )}
            </ul>
          </section>
          Rb
        </section>

        <section className="relative top-[80px] w-full flex-1 rounded-md border border-dashed p-4 lg:sticky">
          <ul className=" mt-3 bg-black">
            {product?.productStores?.length
              ? product.productStores.map((store) => (
                  <li
                    className="border-b border-gray-300 p-1 px-2 text-sm text-white"
                    key={store.storeId}
                  >
                    {store.storeName}
                  </li>
                ))
              : null}
          </ul>

          <div className=" absolute -top-[16px] rounded-md border bg-white p-2 py-1 text-sm font-medium">
            Available at
          </div>
        </section>
      </section>
    </section>
  )
}
