export default function ChatSkeleton() {
  return (
    <section className=" flex-1 animate-pulse p-4 pr-0">
      <div className="flex items-end gap-2">
        <div className="h-7 w-7 rounded-full bg-gray-200"></div>
        <div className="space-y-[1px]">
          <div className="h-6 w-[200px] rounded-[18px] rounded-bl-[5px] bg-gray-200"></div>
          <div className="h-16 w-[270px] rounded-[18px] rounded-bl-[5px] rounded-tl-[5px] bg-gray-200"></div>
          <div className="h-6 w-[100px] rounded-[18px] rounded-tl-[5px] bg-gray-200"></div>
        </div>
      </div>

      <div className=" flex justify-end">
        <div className="flex flex-col items-end space-y-[1px]">
          <div className="h-6 w-[200px] rounded-[18px] rounded-br-[5px] bg-gray-200"></div>
          <div className="h-16 w-[270px] rounded-[18px] rounded-br-[5px] rounded-tr-[5px] bg-gray-200"></div>
          <div className="h-10 w-[230px] rounded-[18px] rounded-br-[5px] rounded-tr-[5px] bg-gray-200"></div>
          <div className="h-6 w-[100px] rounded-[18px] rounded-tr-[5px] bg-gray-200"></div>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="h-7 w-7 rounded-full bg-gray-200"></div>
        <div className="space-y-[1px]">
          <div className="h-16 w-[270px] rounded-[18px] rounded-bl-[5px] bg-gray-200"></div>
        </div>
      </div>

      <div className=" flex justify-end">
        <div className="flex flex-col items-end space-y-[1px]">
          <div className="h-6 w-[200px] rounded-[18px] rounded-br-[5px] bg-gray-200"></div>
          <div className="h-10 w-[230px] rounded-[18px] rounded-br-[5px] rounded-tr-[5px] bg-gray-200"></div>
          <div className="h-6 w-[100px] rounded-[18px] rounded-tr-[5px] bg-gray-200"></div>
        </div>
      </div>
    </section>
  )
}
