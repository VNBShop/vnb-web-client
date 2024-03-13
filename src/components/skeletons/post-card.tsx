export default function PostCardSkeleton({ length = 2 }) {
  return Array.from({ length }).map((_, index) => (
    <article
      key={index}
      className="mb-7 animate-pulse bg-white p-4 md:rounded-lg md:shadow-md"
    >
      <section className="mb-4 flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>

        <div>
          <div className="h-4 w-[80px] rounded-full bg-gray-200"></div>
          <div className="mt-1 h-3 w-[50px] rounded-full bg-gray-200"></div>
        </div>
      </section>
      <section className="space-y-2">
        <p className="h-4 w-[100px] rounded-full bg-gray-200"></p>
        <p className="h-4 w-[200px] rounded-full bg-gray-200"></p>
        <p className="h-4 w-[80px] rounded-full bg-gray-200"></p>
      </section>

      <section className="mt-4 flex items-center justify-between">
        <div className="h-5 w-[70px] rounded-full bg-gray-200"></div>
        <div className="h-5 w-[40px] rounded-full bg-gray-200"></div>
      </section>

      <section className="mt-7 flex items-center justify-between">
        <div className="h-10 w-[120px] rounded-md bg-gray-200"></div>
        <div className="h-10 w-[120px] rounded-md bg-gray-200"></div>
        <div className="h-10 w-[120px] rounded-md bg-gray-200"></div>
      </section>
    </article>
  ))
}
