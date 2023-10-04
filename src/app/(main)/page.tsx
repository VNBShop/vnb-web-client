import Feature from '@/contents/home/feature'
import Hero from '@/contents/home/hero'

export default function Home() {
  return (
    <main className="grid items-center pb-8 md:py-8 container gap-12 pt-0 md:pt-0 max-w-main mx-auto">
      <Hero />
      <Feature />
    </main>
  )
}
