'use client'
import { useState } from 'react'

import Image from 'next/image'

import Carousel from '../carousel'

const postimage = [
  {
    id: 1,
    url: '/common/fake.webp',
  },
  {
    id: 2,
    url: '/common/fake.webp',
  },
  {
    id: 3,
    url: '/common/fake.webp',
  },
  {
    id: 4,
    url: '/common/fake.webp',
  },
  {
    id: 5,
    url: '/common/fake.webp',
  },
]

export default function PostMedia() {
  const [carousel, setCarousel] = useState<any[] | null>(null)

  return (
    <>
      <ul
        className={`grid gap-2 ${postimage.length > 2 ? 'grid-rows-2' : ''}
        ${postimage.length > 1 ? 'grid-cols-2' : ''}
        `}
      >
        {postimage.map((item, index) => {
          return (
            index < 4 && (
              <li
                data-length={postimage.length - 4}
                key={item.id}
                onClick={() => setCarousel(postimage)}
                className={`group relative w-full overflow-hidden pb-[100%] ${
                  postimage.length === 3 ? '[&:nth-child(2)]:row-span-2' : ''
                }
                
            ${
              postimage.length > 4
                ? `last:after:absolute last:after:inset-0 last:after:flex last:after:items-center last:after:justify-center last:after:bg-black last:after:bg-opacity-20 last:after:text-xl last:after:text-white last:after:content-["+"attr(data-length)] last:after:hover:cursor-pointer`
                : ''
            }
            `}
              >
                <figure className=" absolute inset-0">
                  <Image
                    src={item.url}
                    alt={item.url}
                    title={item.id.toLocaleString()}
                    fill
                    className="object-cover transition-all duration-300 hover:cursor-pointer lg:group-hover:scale-105 "
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </figure>
              </li>
            )
          )
        })}
      </ul>

      <Carousel images={carousel} close={() => setCarousel(null)} />
    </>
  )
}
