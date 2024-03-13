'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()
  return (
    <section className="-mt-10 flex h-screen w-full flex-col items-center justify-center gap-16">
      <Image
        src="/common/404.png"
        alt="404 not found"
        width={200}
        height={200}
      />

      <section className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold"> Opps! Not found!</h1>

        <Button
          variant="outline"
          className="mt-10"
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </section>
    </section>
  )
}
