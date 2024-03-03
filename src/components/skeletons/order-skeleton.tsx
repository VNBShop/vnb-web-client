export default function OrderSkeleton() {
  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[rgba(244,245,250)]" />
      <section className="mx-auto mt-7 max-w-[1000px] animate-pulse bg-white p-4 lg:rounded-md">
        <header>
          <h2 className="mb-2 h-5 w-[120px] rounded-full bg-gray-200"></h2>
          <p className="h-4 w-[270px] rounded-full bg-gray-200"></p>

          <h3 className="mt-5 h-5 w-[250px] rounded-full bg-gray-200"></h3>
          <section className="ml-1 mt-2 space-y-1">
            <p className="h-4 w-[50px] rounded-full bg-gray-200"></p>
            <p className="h-4 w-[100px] rounded-full bg-gray-200"></p>
            <p className="h-4 w-[350px] rounded-full bg-gray-200"></p>
          </section>
        </header>
      </section>
      <section className="mx-auto mt-5 max-w-[1000px] bg-white p-4 lg:rounded-md">
        <header>
          <h2 className="h-5 w-[70px] rounded-full bg-gray-200"></h2>
        </header>

        <section className="mt-7 flex h-full flex-col items-start gap-7 lg:flex-row">
          <ul className="w-full space-y-4 lg:w-[60%]">
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-none"
              >
                <figure className="flex items-center gap-2">
                  <div className=" h-[70px] w-[70px] rounded-lg bg-gray-200"></div>

                  <figcaption className="flex-1 space-y-2">
                    <p className="h-5 w-[70px] rounded-full bg-gray-200"></p>
                    <p className="h-4 w-[70px] rounded-full bg-gray-200"></p>
                  </figcaption>
                </figure>

                <p
                  className="h-4 w-[100px] rounded-full bg-gray-200"
                  suppressHydrationWarning
                ></p>
              </li>
            ))}
          </ul>

          <div className="top-[60px] hidden h-[300px] w-[1px] bg-gray-200 lg:sticky lg:block"></div>

          <article className="top-[80px] -mt-1 w-full flex-1 space-y-3 lg:sticky">
            <div className="flex items-center justify-between text-sm">
              <p className="h-4 w-[50px] rounded-full bg-gray-200"></p>
              <p className="h-4 w-[40px] rounded-full bg-gray-200"></p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="h-4 w-[30px] rounded-full bg-gray-200"></p>
              <p className="h-4 w-[20px] rounded-full bg-gray-200"></p>
            </div>

            <hr />

            <div className="flex items-center justify-between text-sm">
              <p className="h-5 w-[50px] rounded-full bg-gray-200"></p>
              <p className=" h-5 w-[100px] rounded-full bg-gray-200"></p>
            </div>

            <section className="!mt-7 space-y-4">
              <div className="h-10 w-full rounded-md bg-gray-200"></div>
              <p className="text-center text-sm text-gray-600"></p>

              <div className="h-10 w-full rounded-md bg-gray-200"></div>
            </section>
          </article>
        </section>
      </section>
    </>
  )
}
