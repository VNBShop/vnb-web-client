import type { Metadata, Viewport } from 'next'

import ConversationSidebar from '@/contents/conversation/sidebar'

export const metadata: Metadata = {
  title: 'Conversation',
}

export const viewport: Viewport = {
  userScalable: false,
}
export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="fixed inset-0 mx-auto mt-[56px] grid max-w-main lg:grid-cols-[25%_75%] lg:pr-4">
      <ConversationSidebar />
      <section className="h-full overflow-hidden">{children}</section>
    </main>
  )
}
