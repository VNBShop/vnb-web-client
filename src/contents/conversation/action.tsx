import Icon from '@/common/icons'

export default function ChatAction() {
  return (
    <section className="flex items-center gap-3 px-2 py-1">
      <div className="h-9 w-9 rounded-full p-1 hover:cursor-pointer lg:hover:bg-gray-100">
        <input type="file" className="hidden" id="file" />
        <label
          htmlFor="file"
          className="flex h-full w-full items-center justify-center hover:cursor-pointer"
        >
          <Icon name="Photo" width={20} height={20} />
        </label>
      </div>

      <input
        type="text"
        placeholder="Aa"
        className="flex-1 rounded-full bg-gray-100 p-2 px-3 py-2 text-sm focus-within:outline-none"
      />

      <button className="flex h-9 w-9 items-center justify-center rounded-full p-1 lg:hover:bg-gray-100">
        <Icon name="Plane" width={20} height={20} />
      </button>
    </section>
  )
}
