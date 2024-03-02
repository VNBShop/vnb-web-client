'use client'

import { HTMLAttributes, useState } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  src: string
  username: string
  nameSize?: string | number
}

export default function Avatar({
  src,
  username,
  nameSize = 18,
  className,
  ...props
}: AvatarProps) {
  const [name, setName] = useState<string | undefined>(undefined)

  return (
    <figure
      {...props}
      className={cn('relative h-9 w-9 rounded-full', className)}
    >
      {!!name ? (
        <p
          className="flex h-full w-full items-center justify-center rounded-full bg-black font-medium text-white"
          style={{
            fontSize: Number(nameSize),
          }}
        >
          {!!username ? username.charAt(0).toUpperCase() : 'Z'}
        </p>
      ) : (
        <Image
          src={src}
          alt="Avatar"
          title="avatar"
          fill
          className="rounded-full object-cover"
          sizes="100vw"
          onError={() => setName(username)}
        />
      )}
    </figure>
  )
}
