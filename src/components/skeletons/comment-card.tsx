export default function CommentCardSkeleton() {
  return (
    <section className="grid gap-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <article
          key={index}
          className="mb-4 inline-flex animate-pulse items-start gap-2"
        >
          <div className="h-9 w-9 rounded-full bg-gray-200"></div>
          <section className="flex-1">
            <div className="space-y-2">
              <h3 className=" h-5 w-[100px] rounded-full bg-gray-200"></h3>
              <p className="h-16 w-[300px] rounded-lg bg-gray-200"></p>
            </div>

            <section className="mt-1 flex items-center gap-3 px-4">
              <p className=" h-4 w-[100px] rounded-full bg-gray-200"></p>
            </section>
          </section>
        </article>
      ))}
    </section>
  )
}
