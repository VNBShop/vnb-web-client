'use client'
import { useState } from 'react'

import Image from 'next/image'

import { usePostItemContext } from '@/context/post-item'

import Carousel from '../carousel'

export default function PostMedia() {
  const [carousel, setCarousel] = useState<any[] | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const { post } = usePostItemContext()

  const photos =
    post?.postImages && post?.postImages.every((photo) => photo.includes('/'))
      ? post.postImages
      : []

  return (
    <>
      <ul
        className={`grid gap-2 ${photos.length > 2 ? 'grid-rows-2' : ''}
        ${photos.length > 1 ? 'grid-cols-2' : ''}
        `}
      >
        {photos.map((item, index) => {
          return (
            index < 4 && (
              <li
                data-length={photos.length - 4}
                key={index}
                onClick={() => {
                  setCarousel(photos)
                  setCarouselIndex(index)
                }}
                className={`group relative w-full overflow-hidden pb-[100%] ${
                  photos.length === 3 ? '[&:nth-child(2)]:row-span-2' : ''
                }
                
            ${
              photos.length > 4
                ? `last:after:absolute last:after:inset-0 last:after:flex last:after:items-center last:after:justify-center last:after:bg-black last:after:bg-opacity-20 last:after:text-xl last:after:text-white last:after:content-["+"attr(data-length)] last:after:hover:cursor-pointer`
                : ''
            }
            `}
              >
                <figure className=" absolute inset-0">
                  <Image
                    src={item}
                    alt={item}
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

      <Carousel
        images={carousel}
        close={() => setCarousel(null)}
        options={{
          startIndex: carouselIndex,
        }}
      />
    </>
  )
}
