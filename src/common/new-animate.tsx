'use client' //add this line

import { createRef, useEffect, useRef } from 'react'

import { Player } from '@lottiefiles/react-lottie-player'

import { newBadge } from '@/animation'

export default function NewBadgeAnimation() {
  const ref = createRef<Player>()

  useEffect(() => {
    !!ref?.current && ref.current?.play()
    console.log('mount animate')

    return () => {
      console.log('unmout animate')

      !!ref?.current && ref.current?.unmounted
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ref ?? {})])
  return (
    <Player
      ref={ref}
      src={newBadge}
      className=" absolute right-[1px] top-[-24px]"
      style={{
        width: 50,
        height: 50,
      }}
      loop
    />
  )
}
