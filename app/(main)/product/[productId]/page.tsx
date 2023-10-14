import Image from 'next/image'

import Icon from '@/common/icons'
import AddToCardForm from '@/components/form/add-to-card'
import CommentForm from '@/components/form/comment'
import CommnentCard from '@/components/ui/card.comment'

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
  rating: 4.3,
  comments: [
    {
      id: 1231,
      userId: '12das2',
      userName: 'Dzung',
      userAvatar: '/common/fake.webp',
      content:
        'Norman: Tao vừa mới bị thằng Nhọ chốt vỡ mồm xong phải đi loay hoay đi đào thằng Kraven lên thì giờ lại đến có đứa chốt vỡ mồm tao rồi đào con giai tao lên à ?? Thằng Nhọ gánh tội cho tao thì tao gánh nhọ cho nó hay gì đây ??',
    },
    {
      id: 2121,
      userId: 'csaa232',
      userName: 'Khang Leo',
      content: 'Ugly racket',
    },
  ],
  description: `<p><strong>1. About Yonex Arc Lite badminton racket</strong></p><p>Yonex Arcsaber Lite badminton racket with its leading advanced technologies applied, you will not need to worry much when you want to own this racquet. Especially if you are looking for a racquet with high stability, flexibility in every move then this will be a great choice for you.</p><p>Overall, this Arc Lite racquet line is manufactured by new innovative materials, H.M. Graphite/NANOAIR SPRING, Graphite frame technology makes the racquet durable and reduces the vibration of the racquet when hitting the shuttle.</p><p>The Yonex Arcsaber Lite is a head-heavy racquet with a medium stiffness body and light racquet weight. This is a natural attack racket suitable for attacking style, using attack power to overwhelm the opponent.</p><p>The racket is designed with an extremely strong design when the detailed lines of yellow and white on both sides of the racket frame stand out against the dark navy blue background of the racket to create a balanced look, a unified block with symmetry. adds strength and certainty to the racquet</p><p>With a low price, guaranteed quality and a powerful and elegant design, Yonex Arcsaber Lite is very suitable for those who play the natural way of playing, those who have been playing for a while, students, students, people who have been playing for a while. play movement.</p><p><br></p><p><strong>2. Yonex Arc Lite badminton racket specifications</strong></p><p>- Hardness: Medium</p><p>- Racket frame: Carbon Ggraphite</p><p>- Body: Carbon Graphite.</p><p>- Weight: 4U</p><p>- Grip circumference: G4, 5</p><p>- Maximum tension: 24 LBS</p><p>- Balance point: 285 – 295 mm</p><p>- Color: Navy Blue/Yellow/White</p><p>- Manufacture: Taiwan</p><p><br></p><p><strong>3. Technology applied to the badminton racket Yonex Arc Lite</strong></p><p>The Nanoair Spring in the resin binds the carbon fibers so that the nano-sized air bubbles in the material help the racquet to bend and flex like in a spring. The result is a better energy transfer from the wire bed to the shuttle for a stronger hit.</p><p>- The ISOOMETRIC was invented by YONEX to maximize this all-important sweet spot and has now become the world's leading feature of YONEX racquets. The square head of the racquet means more strings will pass through the right angle area, making the sweet spot area larger. YONEX continues to develop and enhance the power of ISOMETRIC, further reducing the "dead" zones around the frame edge commonly found on conventional racquets, creating a larger sweet spot area than other frames. other racquets.</p><p>- AERO-BOX FRAME. The purpose of the oval frame face design is so that when hitting the racquet, the wind will let the air through, the BOX FRAME beveled on both sides makes the racket stronger. The design helps to increase aerodynamics, helping us swing the racquet faster, smash the shuttle harder.</p><p><br></p><p><strong>4. Objects suitable for Yonex Arc Lite badminton rackets</strong></p><p>- Suitable for people with average wrist strength, movement players, people who have just played for a while, students.</p><p>- Suitable for players who follow the style of attacking, overwhelming the opponent with attack power, like to smash the bridge.</p>`,
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
    <section className="max-w-main px-4 mt-10 mx-auto flex flex-col lg:flex-row gap-7 items-start">
      <section className="lg:w-[75%] flex items-start flex-col gap-7">
        <section className="flex flex-col lg:flex-row items-start w-full">
          <figure className="lg:w-[45%] w-full">
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

          <article className="flex-1 space-y-3 w-full">
            <h1 className="text-2xl font-medium">{product?.name}</h1>

            <h2 className="text-sm">
              Code: <span className="text-secondary">{params?.productId}</span>
            </h2>

            <div className="flex items-center gap-2 text-sm">
              <h2>
                Brand: <span className=" text-secondary">{product?.brand}</span>
              </h2>
              <div className="w-[1px] h-4 bg-gray-500" />
              <h2>
                Status:{' '}
                <span className="text-secondary">{product?.status}</span>
              </h2>
            </div>

            <div className="flex gap-4 items-end">
              <h2 className="text-xl font-medium text-secondary">
                {product?.price?.toLocaleString()}đ
              </h2>
              <p className=" text-gray-400 ">
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

            <ul className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <li key={index}>
                  <Icon
                    name="Star"
                    width={18}
                    height={18}
                    color={
                      product?.rating
                        ? item <= Math.round(product.rating)
                          ? '#FF9529'
                          : '#B4B4B3'
                        : '#FF9529'
                    }
                  />
                </li>
              ))}
            </ul>

            <div className="border border-dashed relative p-4 rounded-md !my-7">
              <ul className="space-y-3">
                {product.endows.map((endow, index) => (
                  <li
                    className="text-sm text-gray-600 flex items-start gap-2"
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
            </div>

            <AddToCardForm />
          </article>
        </section>

        <section className="w-full mt-10">
          <header className="flex items-center gap-2 mb-5">
            <h2 className="text-xl font-medium">Descriptions</h2>
            <hr className="flex-1" />
          </header>

          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: product?.description,
            }}
          />
        </section>
        <hr className="w-full" />
        <section className="w-full mt-4">
          <CommentForm />

          <ul className="space-y-7 mt-10 max-w-[500px]">
            {!product?.comments?.length ? (
              product.comments.map((comment) => (
                <li key={comment.id}>
                  <CommnentCard
                    comment={comment.content}
                    name={comment.userName}
                    avatar={comment.userAvatar}
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
      </section>

      <section className="p-4 flex-1 relative lg:sticky top-[80px] border-dashed border rounded-md w-full">
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
