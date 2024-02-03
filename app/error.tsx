'use client'

import { Button } from '@/components/ui/button'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="absolute inset-0 flex flex-col items-center justify-center gap-7 bg-white">
      <p>{error?.message ?? 'Some thing went wrong! 🥲'}</p>

      <Button onClick={reset}>Try again</Button>
    </section>
  )
}
