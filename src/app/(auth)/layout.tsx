import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="w-full h-screen flex items-center justify-center relative">
        <header className="max-w-main mx-auto absolute top-0 left-0 right-0 p-4">
          <Link href="/">
            <figure className="flex items-center gap-2">
              <Image
                src="/common/icon.png"
                alt="logo"
                title="logo"
                sizes="100vw"
                width={40}
                height={40}
              />
              <figcaption className=" font-bold text-lg">VNB Shop</figcaption>
            </figure>
          </Link>
        </header>
        <section className="flex lg:w-[75%] lg:h-[75%] w-full h-full items-center max-w-main p-4">
          <figure className=" h-full w-[50%] select-none hidden lg:block">
            <Image
              src="/auth/badminton.webp"
              alt="Auth hero"
              title="Auth hero"
              width="0"
              height="0"
              className="w-full h-full object-contain"
              sizes="100vw"
            />
          </figure>

          <article className="p-4 lg:rounded-lg lg:shadow-box flex-1 bg-white">
            {children}
          </article>
        </section>
        <div className=" absolute -z-[1] hidden h-[calc(100vh)] w-full bg-[url('/common/bg-tailwind.webp')] bg-no-repeat dark:translate-x-[380px] lg:block" />
      </section>
    </>
  )
}
