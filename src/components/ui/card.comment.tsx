import Image from 'next/image'

import Avatar from '../avatar'

export type CommnentCardProps = {
  avatar?: string
  name: string
  comment: string
  createAt?: string
}

export default function CommnentCard({
  avatar,
  name,
  comment,
  createAt,
}: CommnentCardProps) {
  return (
    <article className="inline-flex items-start gap-2">
      <Avatar src="/common/avt.jpeg" username={name} />
      <section className="flex-1">
        <div className="rounded-2xl bg-gray-100 p-2 px-4">
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-sm">{comment}</p>
        </div>
      </section>
    </article>
  )
}
