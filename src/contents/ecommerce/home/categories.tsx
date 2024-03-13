import Image from 'next/image'
import Link from 'next/link'

import { categories } from '@/data'

import { errorFallback } from '../../../../public/common'

export default function Categories() {
  return (
    <section className="relative mt-10 py-10 lg:mt-20">
      <figure className=" absolute inset-0 z-[-4]">
        <Image src="/home/vector.webp" alt="" fill />
      </figure>
      <section className=" mx-auto max-w-[1000px] px-4">
        <h2 className=" text-center text-4xl  font-semibold lg:text-5xl">
          Categories
        </h2>
        <p className=" mt-4 text-center text-xl text-gray-500">
          Find the best badminton gears from stores around the world
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((item) => (
            <li
              key={item.name}
              className="group relative w-full overflow-hidden rounded-lg pb-[70%]"
            >
              <Link href={item.href}>
                <figure className="absolute inset-0">
                  <Image
                    src={item.imageSrc ?? errorFallback}
                    alt={item.name}
                    title={item.name}
                    fill
                    className="z-[-3] rounded-lg object-cover transition-all duration-300 hover:cursor-pointer lg:group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <figcaption className=" absolute bottom-2 left-2 z-[1] ">
                    <p className="line-clamp-1 text-sm font-medium text-white drop-shadow-md">
                      {item.name}
                    </p>
                  </figcaption>

                  <div className="absolute inset-0 z-[-2] bg-black bg-opacity-20" />
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
