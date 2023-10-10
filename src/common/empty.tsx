import { HTMLAttributes } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

type EmptyProps = HTMLAttributes<HTMLDivElement> & {
  message?: string
}
export default function Empty({ message, className, ...props }: EmptyProps) {
  return (
    <section
      className={cn('w-full flex items-center justify-center py-32', className)}
      {...props}
    >
      <figure>
        <figcaption className="text-center text-lg font-medium">
          {message}
        </figcaption>
        <Image src="/common/404.png" alt="Notfound" width={300} height={300} />
      </figure>
    </section>
  )
}
