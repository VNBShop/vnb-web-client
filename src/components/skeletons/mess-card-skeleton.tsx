export default function MessCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-2 rounded-md px-2 py-[5px] lg:hover:bg-gray-100">
      <div className="h-12 w-12 rounded-full bg-gray-200" />
      <section className="flex-1">
        <p className="h-5 w-[80%] rounded-full bg-gray-200"></p>
        <div className="mt-1 flex items-center gap-1">
          <p className=" h-4 w-[50%] rounded-full bg-gray-200"></p>
          <span className="h-2 w-2 rounded-full bg-gray-200"></span>
        </div>
      </section>
    </div>
  )
}
