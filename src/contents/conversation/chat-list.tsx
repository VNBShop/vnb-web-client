'use client'
import { useEffect, useRef, useState } from 'react'

import Avatar from '@/components/avatar'

export default function ChatList() {
  const [chats, setChats] = useState(chatlists)

  const scrollViewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [chats])

  return (
    <section className=" w-full flex-1 overflow-auto px-4">
      <section className="space-y-1 py-4">
        {chats.map((item, index) => {
          return item.senderId === 1 ? (
            <article key={index} className="me flex items-end justify-end">
              <p className="max-w-[40%] flex-1 bg-black p-3 py-2 text-sm text-white">
                {item.content}
              </p>
            </article>
          ) : (
            <article
              key={index}
              className="him flex items-end justify-start gap-2"
            >
              <Avatar src="/common/avt.jpeg" username="D" />
              <p className="max-w-[40%] flex-1 bg-gray-200 p-3 py-2 text-sm">
                {item.content}
              </p>
            </article>
          )
        })}

        <div ref={scrollViewRef} />
      </section>
    </section>
  )
}

const chatlists = [
  {
    senderId: 1,
    reciverId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 2,
    reciverId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 1,
    reciverId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 2,
    reciverId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 2,
    reciverId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 1,
    reciverId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 1,
    reciverId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 1,
    reciverId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 2,
    reciverId: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    senderId: 1,
    reciverId: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]
