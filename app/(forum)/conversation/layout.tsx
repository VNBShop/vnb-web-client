import type { Metadata } from 'next'

import ConversationSidebar from '@/contents/conversation/sidebar'

export const metadata: Metadata = {
  title: 'Conversation',
}

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="fixed inset-0 mx-auto mt-[56px] grid max-w-main grid-cols-[25%_75%] pr-4">
      <ConversationSidebar />
      <section className=" col-span-[75%] h-full overflow-hidden">
        {children}
      </section>
    </main>
  )
}
