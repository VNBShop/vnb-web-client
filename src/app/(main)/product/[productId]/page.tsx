import Image from 'next/image'

type ProductPageProps = {
  params: {
    productId: string
  }
}

const product = {
  id: 123123,
  name: 'Yonex BA261CR Badminton Racket',
  image: '/common/fake.webp',
  brand: 'Yonex',
  status: 'Available',
  price: 3490000,
  endows: ['Free 1 pair of VNB badminton socks', 'Genuine products'],
  quantity: 12,
  stores: [
    {
      id: 1,
      name: 'District 1',
    },
    {
      id: 2,
      name: 'District 2',
    },
    {
      id: 3,
      name: 'District 3',
    },
    {
      id: 4,
      name: 'District 4',
    },
    {
      id: 5,
      name: 'District 5',
    },
  ],
}
export default function ProductPage({ params }: ProductPageProps) {
  return (
    <section className="max-w-main px-4 mt-10 mx-auto flex gap-7 items-start">
      <section className="w-[75%] h-[1000px] flex items-start">
        <figure className=" w-[50%]">
          <Image
            src={product.image}
            alt={product.name}
            title={product.name}
            width="0"
            height="0"
            className=" object-contain w-full h-full"
            sizes="100vw"
          />
        </figure>

        <article className="flex-1 space-y-3">
          <h1 className="text-2xl font-medium">{product?.name}</h1>

          <h2 className="text-sm">
            Code: <span className="text-secondary">{product?.id}</span>
          </h2>

          <div className="flex items-center gap-2 text-sm">
            <h2>
              Brand: <span className=" text-secondary">{product?.brand}</span>
            </h2>
            <div className="w-[1px] h-4 bg-gray-500" />
            <h2>
              Status: <span className="text-secondary">{product?.status}</span>
            </h2>
          </div>

          <div className="flex gap-4 items-end">
            <h2 className="text-xl font-medium text-secondary">
              {product?.price?.toLocaleString()}đ
            </h2>
            <p className=" text-gray-600 ">
              SRP:{' '}
              {product?.price ? (
                <span className=" line-through">
                  {(product?.price + product?.price * 0.1).toLocaleString()}đ
                </span>
              ) : (
                0
              )}
            </p>
          </div>
        </article>
      </section>

      <section className="p-4 flex-1 sticky top-[80px] border-dashed border rounded-lg">
        <ul className=" bg-black mt-3">
          {product?.stores?.length
            ? product.stores.map((store) => (
                <li
                  className="text-white border-b border-gray-300 p-1 px-2 text-sm"
                  key={store.id}
                >
                  {store.name}
                </li>
              ))
            : null}
        </ul>

        <div className=" absolute -top-[16px] p-2 py-1 rounded-md border text-sm font-medium bg-white">
          Available at
        </div>
      </section>
    </section>
  )
}
