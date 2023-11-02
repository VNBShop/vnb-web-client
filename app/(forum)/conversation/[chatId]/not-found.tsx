import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  icons: 'common/icon.png',
  title: '404 - Not found',
}

export default function NotFound() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Image
        src="/common/404.png"
        alt="not fount"
        width={130}
        height={130}
        sizes="100vw"
      />
      <p className="text-lg font-medium">No chat with id conversation!</p>
    </section>
  )
}
