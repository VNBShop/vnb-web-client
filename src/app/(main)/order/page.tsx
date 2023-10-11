import OrderForm from '@/components/form/order'

export default function OrderPage() {
  const arr = []

  for (let i = 0; i < 10; i++) {
    const fakeData = {
      id: i + 1,
      image: '/common/fake.webp',
      name: `Lining racket HC1200 ${i + 1}`,
      price: Math.floor(Math.random() * 9900001) + 100000,
      quantity: 12,
    }
    arr.push(fakeData)
  }

  return (
    <section className="max-w-[700px] mx-auto mt-10">
      <header>
        <h1 className="text-xl font-medium">Order</h1>
        <p className="mt-1 text-gray-500">
          Fill in form to complete your order
        </p>
      </header>

      <section className="mt-7">
        <OrderForm />
      </section>
    </section>
  )
}
