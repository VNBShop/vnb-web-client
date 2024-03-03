export default function OrderedCardSketelon() {
  return Array.from({ length: 1 }).map((_, index) => (
    <section
      key={index}
      className="w-full animate-pulse bg-white p-4 shadow-sm md:rounded-md"
    >
      <section className="mb-2 flex items-center justify-between">
        <p className=" h-4 w-[140px] rounded-full bg-gray-200"></p>

        <div className=" h-4 w-[140px] rounded-full bg-gray-200"></div>
      </section>

      <section className="w-ful space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="flex w-full items-center justify-between"
          >
            <section className="flex items-center gap-4">
              <figure className="relative h-[100px] w-[100px] rounded-md bg-gray-200"></figure>

              <section className="space-y-2">
                <p className="h-5 w-[200px] rounded-full bg-gray-200"></p>
                <p className="h-4 w-[100px] rounded-full bg-gray-200"></p>
                <p className="h-4 w-[50px] rounded-full bg-gray-200"></p>
              </section>
            </section>

            <p className="h-4 w-[80px] rounded-full bg-gray-200"></p>
          </article>
        ))}
      </section>

      <div className="my-3 h-[1px] w-full bg-gray-200"></div>

      <section className="flex items-start justify-between ">
        <div className="h-5 w-[130px] rounded-full bg-gray-200"></div>

        <section className="space-y-2 text-sm">
          <p className="h-5 w-[150px] rounded-full bg-gray-200"></p>
          <p className="h-5 w-[130px] rounded-full bg-gray-200"></p>
        </section>
      </section>
    </section>
  ))
}
