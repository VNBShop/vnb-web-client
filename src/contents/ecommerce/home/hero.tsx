'use client'

import { useEffect } from 'react'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/common/icons'

export default function Hero() {
  // have some problem here
  // useEffect(() => {
  //   ;(async () => {
  //     const test = await axios.get(
  //       `${process.env.NEXT_PRODUCT_SERVICE}/product/827`,
  //       {
  //         headers: {
  //           'ngrok-skip-browser-warning': true,
  //         },
  //       }
  //     )

  //     console.log('test >>>>', test)
  //   })()
  // }, [])
  return (
    <section className="relative">
      {/* <section
        className=" absolute inset-0 inset-x-[-100px] bottom-[-300px] z-[-1]"
        aria-hidden
      >
        <Image src="/common/racket.webp" alt="racket" fill />
      </section> */}
      <section className="relative z-[1] mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-28">
        <h1 className="mb-6 flex select-none flex-col flex-wrap items-center justify-center gap-4 text-6xl font-semibold md:text-7xl lg:flex-row lg:gap-0 lg:text-8xl">
          <span className=" h1-animation-first relative">
            <span className="animation-color-blue bg-clip-text text-transparent">
              Diverse
            </span>
          </span>
          <span className="hidden lg:inline">.</span>
          <span className=" h1-animation-second relative">
            <span className="animation-color-pink bg-clip-text text-transparent">
              Esteem
            </span>
          </span>
          <span className="hidden lg:inline">.</span>
          <span className=" h1-animation-third relative">
            <span className="animation-color-orange bg-clip-text text-transparent">
              Professional
            </span>
          </span>
        </h1>

        <blockquote className="max-w-[700px] text-lg text-gray-600 drop-shadow-md lg:text-2xl">
          Buy and sell sport gears from independent brands and stores around the
          world with ease 🎾
        </blockquote>

        <section className="mt-[30px] flex items-center gap-4">
          <div className="button-Cus relative h-[48px] w-[170px] rounded-lg">
            <Link
              href="/products"
              className=" flex h-full w-full items-center justify-center gap-2 rounded-lg border-[1.2px] border-transparent bg-white bg-clip-padding font-medium text-black dark:bg-black  dark:text-white"
            >
              <Icon name="Cart" size={16} /> Buying now
            </Link>

            <span className="animation-color-blue-shadow absolute inset-0 z-[-1] h-full w-full rounded-lg" />
            <span className="animation-color-pink-shadow absolute inset-0 z-[-1] h-full w-full rounded-lg" />
            <span className="animation-color-orange-shadow absolute inset-0 z-[-1] h-full w-full rounded-lg" />
          </div>

          <Link
            href="/forum"
            className="flex h-[48px] items-center justify-end rounded-lg bg-black px-10 font-medium text-white lg:hover:bg-black/70"
          >
            Forum
          </Link>
        </section>
      </section>

      {/* <figure className=" absolute bottom-[-250px] right-[150px] z-[-1] hidden rotate-[-40deg]  lg:block">
        <Image src="/home/tenis.webp" alt="logo" width={250} height={250} />
      </figure> */}

      {/* <figure className=" absolute bottom-[-100px] right-[-35px] z-[-1] hidden scale-x-[-1] lg:block">
        <Image src="/home/table.png" alt="logo" width={300} height={300} />
      </figure> */}
    </section>
  )
}
