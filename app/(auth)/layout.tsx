import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="relative flex h-screen w-full items-center justify-center">
        <header className="absolute left-0 right-0 top-0 mx-auto max-w-main p-4">
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
              <figcaption className=" text-lg font-bold">VNB Shop</figcaption>
            </figure>
          </Link>
        </header>
        <section className="flex h-full w-full max-w-main items-center p-4 lg:h-[75%] lg:w-[75%]">
          <figure className=" hidden h-full w-[50%] select-none lg:block">
            <Image
              src="/auth/badminton.webp"
              alt="Auth hero"
              title="Auth hero"
              width="0"
              height="0"
              className="h-full w-full object-contain"
              sizes="100vw"
            />
          </figure>

          <article className="flex-1 bg-white p-4 lg:rounded-lg lg:shadow-box">
            {children}
          </article>
        </section>
        <div className=" absolute -z-[1] hidden h-[calc(100vh)] w-full bg-[url('/common/bg-tailwind.webp')] bg-no-repeat lg:block" />
      </section>
    </>
  )
}
