import Image from 'next/image'

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
    <article className="flex items-start gap-4">
      <figure
        className={`w-10 h-10 rounded-full ${
          avatar ? '' : 'flex items-center justify-center bg-black'
        }`}
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            title={name}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </figure>
      <section className="flex-1">
        <div className="bg-gray-100 p-2 px-4 rounded-2xl">
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-sm">{comment}</p>
        </div>
      </section>
    </article>
  )
}
