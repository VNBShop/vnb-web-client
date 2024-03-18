import { memo, useEffect, useRef } from 'react'

import { useInView } from 'react-intersection-observer'

import Spiner from '@/common/spiner'
import Avatar from '@/components/avatar'
import { useUserContext } from '@/context/user'
import { markConsecutiveDuplicates } from '@/lib/utils'

import { Chat } from '../../../types/messenger'
import { User } from '../../../types/user'

type IProps = {
  chats: Chat[]
  userAccount: User
  hasNextPage: boolean
  loading: boolean
  onFetchNextPage: () => void
}

function ChatList({
  chats,
  userAccount,
  loading,
  hasNextPage,
  onFetchNextPage,
}: IProps) {
  const scrollViewRef = useRef<HTMLDivElement>(null)

  const user = useUserContext()

  useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollIntoView()
    }
  }, [])

  const check = markConsecutiveDuplicates([...chats])

  const { ref, inView } = useInView({
    delay: 1300,
    threshold: 0.5,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      onFetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  return (
    <section className=" w-full flex-1 overflow-auto px-4 pb-2 transition-all duration-300 ease-in-out">
      <section className="space-y-[1px] py-4 pb-0">
        {!loading && hasNextPage && <div ref={ref}></div>}

        {loading && !!check?.length && (
          <div className="flex items-center justify-center">
            <Spiner size={20} />
          </div>
        )}

        {check.map((item, index: number) => {
          return item.senderId === user?.userId && !!item?.content ? (
            !!item?.content ? (
              <article key={index} className="flex items-start justify-end">
                <p
                  className={`inline-block max-w-[70%] rounded-[18px] ${
                    item?.position === 'first'
                      ? ' !mt-3 rounded-[18px] rounded-br-[4px]'
                      : ''
                  }  ${
                    item?.position === 'middle'
                      ? ' rounded-[18px] rounded-br-[4px] rounded-tr-[4px]'
                      : ''
                  }

                ${
                  item?.position === 'last'
                    ? ' !mb-3 rounded-[18px] rounded-tr-[4px]'
                    : ''
                }

                ${!item?.position ? '!my-3' : ''}
      
                bg-black p-3 py-2 text-sm text-white`}
                >
                  {item.content}
                </p>
              </article>
            ) : null
          ) : !!item?.content ? (
            <article key={index} className="flex items-end justify-start gap-2">
              {(item?.position && item?.position === 'last') ||
              !item?.position ? (
                <Avatar
                  src={userAccount?.avatar ?? ''}
                  username={
                    userAccount?.firstName ??
                    userAccount?.lastName ??
                    userAccount?.email ??
                    'Z'
                  }
                />
              ) : (
                <div className="h-9 w-9" />
              )}

              <p
                className={`
                 inline-block max-w-[70%] rounded-[18px] bg-gray-200 p-3 py-2 text-sm ${
                   item?.position === 'first'
                     ? ' rounded-[18px] rounded-bl-[4px]'
                     : ''
                 }  ${
                   item?.position === 'middle'
                     ? ' rounded-[18px] rounded-bl-[4px] rounded-tl-[4px]'
                     : ''
                 }

                  ${
                    item?.position === 'last'
                      ? ' rounded-[18px] rounded-tl-[4px]'
                      : ''
                  }`}
              >
                {item.content}
              </p>
            </article>
          ) : null
        })}

        <div ref={scrollViewRef} />
      </section>
    </section>
  )
}

export default memo(ChatList)
