'use client'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  icons: 'common/icon.png',
  title: '404 - Not found - VNB Shop',
}

export default function NotFound() {
  const router = useRouter()
  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden ">
      <section className="flex flex-col-reverse items-center gap-0 md:flex-row">
        <article className="mr-0 text-center md:-mr-[150px] md:text-left">
          <h2 className="mb-7 text-4xl font-semibold md:text-[56px]">OOPS!</h2>
          <p className="mt-2 text-2xl font-medium md:mt-0 md:text-4xl">
            404 - Page Not Found
          </p>

          <button
            onClick={() => router.back()}
            className="mt-5 inline-block rounded-full border border-black px-7 py-2 text-lg transition-all duration-200 ease-linear md:mt-10 lg:bg-transparent lg:hover:bg-black lg:hover:text-white"
          >
            Go back
          </button>
        </article>

        <Image
          width="0"
          height="0"
          sizes="100vw"
          src="/common/404.png"
          alt="404 Not Found"
          className="mr-0 w-[800px] md:-mr-[300px]"
        />
      </section>
    </section>
  )
}
