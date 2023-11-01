import Benefits from '@/contents/ecommerce/home/benefit'
import Categories from '@/contents/ecommerce/home/categories'
import Feature from '@/contents/ecommerce/home/feature'
import Hero from '@/contents/ecommerce/home/hero'

export default function Home() {
  return (
    <main className="container mx-auto grid max-w-main items-center gap-12 pb-8 pt-0 md:py-8 md:pt-0">
      <Hero />
      <Categories />
      <Benefits />
      <Feature />
    </main>
  )
}
