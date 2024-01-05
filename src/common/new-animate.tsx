'use client' //add this line

import { Player } from '@lottiefiles/react-lottie-player'

import { newBadge } from '@/animation'

export default function NewBadgeAnimation() {
  return (
    <Player
      src={newBadge}
      className=" absolute right-[1px] top-[-24px]"
      style={{
        width: 50,
        height: 50,
      }}
      loop
      autoplay
    />
  )
}
