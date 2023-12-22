import { HTMLAttributes } from 'react'

import Image from 'next/image'

import Icon from '@/common/icons'
import { cn } from '@/lib/utils'

export type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  image: string
  price: number
}

export default function ProductCard({
  name,
  className,
  price,
  image,
  ...props
}: ProductCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-lg hover:cursor-pointer',
        className
      )}
      {...props}
    >
      <section className="relative w-full overflow-hidden rounded-lg pb-[100%]">
        <figure className="absolute inset-0">
          <Image
            src={image}
            alt={name}
            title={name}
            fill
            className="rounded-lg object-contain transition-all duration-300 lg:group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>
      </section>

      <section className="flex flex-1 flex-col justify-between p-4">
        <div className=" text-sm font-medium">{name}</div>
        <section className="mt-2 flex items-center justify-between">
          <p className=" text-sm text-[#FF3FA4]">
            {price
              ? price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              : null}
          </p>

          <section className="flex items-center gap-2">
            <Icon name="HeartOutline" width={23} height={23} />
          </section>
        </section>
      </section>
    </article>
  )
}
