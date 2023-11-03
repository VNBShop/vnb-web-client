import Icon from '@/common/icons'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="mx-auto relative flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-28">
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

      <blockquote className="max-w-[800px] text-xl text-gray-600 drop-shadow-md lg:text-2xl">
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

      <figure className=" absolute bottom-0 right-0 hidden lg:block">
        <Image src="/home/badminton.svg" alt="logo" width={100} height={100} />
      </figure>
      <figure className=" absolute bottom-[60px] right-14 hidden lg:block rotate-[-70deg]">
        <Image src="/home/badminton.svg" alt="logo" width={80} height={80} />
      </figure>
    </section>
  )
}