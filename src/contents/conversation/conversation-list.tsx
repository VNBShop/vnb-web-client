import { useEffect } from 'react'

import { useInView } from 'react-intersection-observer'

import ConversationCard from '@/components/conversation-card'
import MessCardSkeleton from '@/components/skeletons/mess-card-skeleton'
import useFetchChats from '@/hooks/chat/useFetchChats'

export default function ConversationList() {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    messages,
  } = useFetchChats()

  const { ref, inView } = useInView({
    delay: 1300,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  return (
    <ul className="w-full flex-1 space-y-[6px] overflow-auto">
      {!isError &&
        !!messages?.length &&
        messages.map((mess, index) => (
          <li key={mess.receiverId}>
            <ConversationCard chat={mess} />
          </li>
        ))}

      {(isFetchingNextPage || isPending) && <MessCardSkeleton />}

      {(isError || !messages?.length) && !isPending && !isFetchingNextPage && (
        <p className="mt-6 text-center text-sm text-gray-500">
          You has no messeges yet
        </p>
      )}

      {!isError && !isPending && !isFetchingNextPage && hasNextPage && (
        <div ref={ref}></div>
      )}
    </ul>
  )
}
