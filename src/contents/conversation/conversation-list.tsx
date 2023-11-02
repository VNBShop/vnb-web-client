import ConversationCard from '@/components/conversation-card'

export default function ConversationList() {
  return (
    <ul className="w-full flex-1 overflow-auto">
      {Array.from('0123456789412312', Number).map((_: unknown, index) => (
        <li key={index}>
          <ConversationCard />
        </li>
      ))}
    </ul>
  )
}
