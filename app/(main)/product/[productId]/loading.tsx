import Icon from '@/common/icons'

export default function ProductLoading() {
  return (
    <section className="mx-auto mt-5 max-w-main animate-pulse space-y-7 px-4">
      <div className="h-4 w-[200px] rounded-md bg-gray-200" />

      <section className="flex flex-col items-start gap-7 lg:flex-row">
        <section className="flex w-full flex-col items-start gap-7 lg:w-[75%]">
          <section className="flex w-full flex-col items-start gap-7 gap-x-10 lg:flex-row">
            <figure className="aspect-square w-full rounded-md bg-gray-200 lg:w-[45%]"></figure>

            <article className="w-full flex-1 space-y-6">
              <div className="h-5 w-[300px] rounded-md bg-gray-200" />

              <div className="h-3 w-[120px] rounded-md bg-gray-200" />

              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-[200px] rounded-md bg-gray-200" />
                <div className="h-4 w-[1px] bg-gray-500" />
                <div className="h-4 w-[150px] rounded-md bg-gray-200" />
              </div>

              <div className="flex items-end gap-4">
                <div className="h-5 w-[70px] rounded-md bg-gray-200" />
                <div className="h-5 w-[90px] rounded-md bg-gray-200" />
              </div>

              <ul className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <li key={index}>
                    <Icon name="Star" size={18} color={'#B4B4B3'} />
                  </li>
                ))}
              </ul>

              <li className="flex items-center gap-1 text-gray-500">
                <div className="h-5 w-[70px] rounded-md bg-gray-200" />
                <div className="h-5 w-[40px] rounded-md bg-gray-200" />
              </li>

              <li className="flex items-center gap-1 text-gray-500">
                <div className="h-5 w-[30px] rounded-md bg-gray-200" />
                <div className="h-5 w-[70px] rounded-md bg-gray-200" />
              </li>

              <li className="flex items-center gap-1 text-gray-500">
                <div className="h-5 w-[60px] rounded-md bg-gray-200" />
                <div className="h-5 w-[30px] rounded-md bg-gray-200" />
              </li>

              <li className="flex items-center gap-1 text-gray-500">
                <div className="h-5 w-[20px] rounded-md bg-gray-200" />
                <div className="h-5 w-[130px] rounded-md bg-gray-200" />
              </li>

              <li className="flex items-center gap-1 text-gray-500">
                <div className="h-5 w-[70px] rounded-md bg-gray-200" />
                <div className="h-5 w-[40px] rounded-md bg-gray-200" />
              </li>

              <div className="h-7 w-[200px] rounded-md bg-gray-200" />
            </article>
          </section>
          <hr className="w-full" />
          <section className="mt-4 w-full">
            <div className="h-24 w-[400px] rounded-md bg-gray-200" />

            <ul className="mt-10 max-w-[500px] space-y-7">
              <article className="inline-flex items-start gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <section className="flex-1">
                  <div className="h-[100px] w-[300px] rounded-2xl bg-gray-100" />
                </section>
              </article>

              <article className="inline-flex items-start gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <section className="flex-1">
                  <div className="h-[70px] w-[400px] rounded-2xl bg-gray-100" />
                </section>
              </article>
            </ul>
          </section>
        </section>

        <section className="relative top-[80px] h-[100px] w-full flex-1 rounded-md bg-gray-200 p-4 lg:sticky"></section>
      </section>
    </section>
  )
}
