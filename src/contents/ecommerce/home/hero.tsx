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
    <section className=" relative">
      <section className="relative mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-28">
        <h1 className="mb-6 flex select-none flex-col flex-wrap items-center justify-center gap-4 text-6xl font-semibold md:text-7xl lg:flex-row lg:gap-0 lg:text-8xl">
          <span className=" h1-animation-first relative">
            <span className="animation-color-blue bg-clip-text text-transparent">
              Diverse
            </span>
          </span>
          <span className="hidden lg:inline">.</span>
          <span className=" h1-animation-second relative">
            <span className="animation-color-pink bg-clip-text text-transparent">
              Trustworthy
            </span>
          </span>
          <span className="hidden lg:inline">.</span>
          <span className=" h1-animation-third relative">
            <span className="animation-color-orange bg-clip-text text-transparent">
              Professional
            </span>
          </span>
        </h1>

        <blockquote className="max-w-[700px] text-xl text-gray-600 drop-shadow-md lg:text-2xl">
          Buy and sell badminton gears from independent brands and stores around
          the world with ease
        </blockquote>

        <div className="button-Cus relative mt-[30px] h-[50px] w-[170px] rounded-full">
          <Link
            href="/products"
            className=" flex h-full w-full items-center justify-center gap-2 rounded-full border-[1.2px] border-transparent bg-white bg-clip-padding font-medium text-black dark:bg-black  dark:text-white"
          >
            <Icon name="Cart" width={16} height={16} /> Buying now
          </Link>

          <span className="animation-color-blue-shadow absolute inset-0 z-[-1] h-full w-full rounded-full" />
          <span className="animation-color-pink-shadow absolute inset-0 z-[-1] h-full w-full rounded-full" />
          <span className="animation-color-orange-shadow absolute inset-0 z-[-1] h-full w-full rounded-full" />
        </div>
      </section>

      <figure className=" absolute bottom-[-250px] right-[150px] z-[-1] hidden rotate-[-40deg]  lg:block">
        <Image src="/home/tenis.webp" alt="logo" width={250} height={250} />
      </figure>

      <figure className=" absolute bottom-[-100px] right-[-35px] z-[-1] hidden scale-x-[-1] lg:block">
        <Image src="/home/table.png" alt="logo" width={300} height={300} />
      </figure>
    </section>
  )
}
