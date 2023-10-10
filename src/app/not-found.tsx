import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  icons: 'common/icon.png',
  title: '404 - Not found - VNB Shop',
}

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#ebfffd]">
      <section className="flex flex-col-reverse items-center gap-0 md:flex-row">
        <article className="mr-0 text-center md:-mr-[150px] md:text-left">
          <h2 className="text-4xl font-semibold text-[#1b84f5] mb-7 md:text-[56px]">
            OOPS!
          </h2>
          <p className="mt-2 text-2xl font-medium text-[#279eff] md:mt-0 md:text-4xl">
            404 - Page Not Found
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-full border bg-[#279eff] px-7 py-3 text-lg text-white transition-all duration-200 ease-linear md:mt-10 lg:border-[#279eff] lg:bg-transparent lg:text-[#279eff] lg:hover:bg-[#279eff] lg:hover:text-white"
          >
            Take me home
          </Link>
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
