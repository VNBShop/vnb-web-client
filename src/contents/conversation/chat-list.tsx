import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'

import Avatar from '@/components/avatar'
import { markConsecutiveDuplicates } from '@/lib/utils'

export type ChatListProps = {
  id?: string
  sender: string | number
  receiver: string | number
  content: string
  createAt?: string
}

function ChatList({
  chats,
  isTyping,
}: {
  chats: ChatListProps[]
  isTyping: boolean
}) {
  const scrollViewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [chats, isTyping])

  // useLayoutEffect(() => {
  //   if (scrollViewRef && scrollViewRef.current) {
  //     scrollViewRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [])

  const check = markConsecutiveDuplicates(chats)

  return (
    <section className=" w-full flex-1 overflow-auto px-4 transition-all duration-300 ease-in-out">
      <section className="space-y-[1px] py-4 pb-0">
        {check.map((item, index: number) => {
          return item.sender === 1 && !!item?.content ? (
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
                <Avatar src="/common/avt.jpeg" username="D" />
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

        {isTyping ? (
          <article className="flex items-end justify-start gap-2 pb-3">
            <Avatar src="/common/avt.jpeg" username="D" />
            <div className="space-x-[3px] rounded-[18px] bg-gray-200 p-4 py-1">
              <span className="dot one"></span>
              <span className="dot two"></span>
              <span className="dot three"></span>
            </div>
          </article>
        ) : null}

        <div ref={scrollViewRef} />
      </section>
    </section>
  )
}

export default memo(ChatList)
