'use client'

import { useState } from 'react'

export default function PostStatus() {
  const [toggleMore, setToggleMore] = useState(false)

  const handleToggleMore = () => {
    setToggleMore((prev) => !prev)
  }

  return (
    <>
      <p className={`mt-4 px-4 text-sm ${toggleMore ? '' : 'line-clamp-3'}`}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <p
        className="mb-4 px-4 text-sm text-blue-600 hover:cursor-pointer hover:underline"
        onClick={handleToggleMore}
      >
        {toggleMore ? 'See less...' : 'See more...'}
      </p>
    </>
  )
}
