export default function ProfileHeaderSkeleton() {
  return (
    <section className="mx-auto w-full max-w-secondary animate-pulse px-4">
      <section className="mt-7 flex flex-col items-center justify-between gap-y-4 md:flex-row md:items-end">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="h-[110px] w-[110px] rounded-full bg-gray-200"></div>

          <article className=" space-y-1 text-center md:text-left">
            <p className="h-5 w-28 rounded-full bg-gray-200"></p>
            <p className="h-4 w-[50px] rounded-full bg-gray-200"></p>
          </article>
        </div>

        <div className=" flex items-center space-x-2 text-center">
          <div className=" h-9 w-[100px] rounded-md bg-gray-200"></div>
          <div className=" h-9 w-[100px] rounded-md bg-gray-200"></div>
        </div>
      </section>
      <hr className="mb-1 mt-4" />
      <section className="flex items-center justify-center gap-2 pb-1 lg:justify-normal">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <div className="h-12 w-[100px] rounded-md bg-gray-200"></div>
          </div>
        ))}
      </section>
    </section>
  )
}
