'use client'

import { useEffect, useRef, useState } from 'react'

import { usePostItemContext } from '@/context/post-item'

export default function PostStatus() {
  const [toggleMore, setToggleMore] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  const handleToggleMore = () => {
    setToggleMore((prev) => !prev)
  }

  const { post } = usePostItemContext()

  useEffect(() => {
    // Check if text content exceeds 3 lines
    if (
      textRef.current &&
      textRef.current.scrollHeight > textRef.current.offsetHeight * 3
    ) {
      setToggleMore(true) // Show "See more..." initially
    }
  }, [post])

  return (
    <section className="my-4">
      <p
        ref={textRef}
        className={`px-4 text-sm ${toggleMore ? '' : 'line-clamp-3'}`}
      >
        {post?.postContent}
      </p>
      {toggleMore && ( // Only show "See more..." if needed
        <p
          className="px-4 text-sm text-blue-600 hover:cursor-pointer hover:underline"
          onClick={handleToggleMore}
        >
          {toggleMore ? 'See less...' : 'See more...'}
        </p>
      )}
    </section>
  )
}
