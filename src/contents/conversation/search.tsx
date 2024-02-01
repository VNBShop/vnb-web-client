import Icon from '@/common/icons'

export default function ConversationSearch() {
  return (
    <div className="w-full px-2">
      <div className="flex w-full items-center gap-1 rounded-full border bg-gray-50 p-2 py-2 text-sm hover:cursor-text">
        <Icon name="Search" width={20} height={20} color="gray" />
        <input
          className="flex-1 bg-transparent text-xs text-gray-500 focus-within:outline-0"
          placeholder="Search conversation..."
        />
      </div>
    </div>
  )
}
