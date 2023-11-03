import Image from 'next/image'

export default function Conversation() {
  return (
    <section className="lg:col-span-[75%] col-span-1 hidden h-full w-full flex-col items-center justify-center gap-4 lg:flex">
      <Image
        src="/common/404.png"
        alt="not fount"
        width={130}
        height={130}
        sizes="100vw"
      />
      <p className="text-lg font-medium">No chat selected!</p>
    </section>
  )
}
