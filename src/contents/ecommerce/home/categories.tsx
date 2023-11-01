import { categories } from '@/data'
import Image from 'next/image'
import Link from 'next/link'

export default function Categories() {
  return (
    <section className="lg:mt-20 mt-10 relative py-10">
      <figure className=" absolute inset-0 z-[-4]">
        <Image src="/home/vector.webp" alt="" fill />
      </figure>
      <section className=" mx-auto max-w-[1000px] px-4">
        <h2 className=" text-4xl lg:text-5xl  font-semibold text-center">
          Categories
        </h2>
        <p className=" text-xl text-gray-500 mt-4 text-center">
          Find the best badminton gears from stores around the world
        </p>

        <ul className="grid gap-7 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 mt-10">
          {categories.map((item) => (
            <li
              key={item.name}
              className="group relative w-full overflow-hidden rounded-lg pb-[70%]"
            >
              <Link href={item.href}>
                <figure className="absolute inset-0">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    title={item.name}
                    fill
                    className="rounded-lg z-[-3] object-cover transition-all duration-300 hover:cursor-pointer lg:group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <figcaption className=" absolute z-[1] bottom-2 left-2 ">
                    <p className="text-sm line-clamp-1 text-white drop-shadow-md font-medium">
                      {item.name}
                    </p>
                  </figcaption>

                  <div className="bg-black absolute inset-0 bg-opacity-20 z-[-2]" />
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
