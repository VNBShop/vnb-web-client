'use client'

import { useEffect } from 'react'

import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export default function GoogleOAuth() {
  const onSubmit = async () => {
    const result = await signIn('google', {
      redirect: false,
    })

    console.log('res >>', result)
  }

  return (
    <>
      <Button className="gap-1 bg-white hover:bg-white" onClick={onSubmit}>
        <Image
          src="/common/google.png"
          alt="google"
          width={40}
          height={40}
          sizes="100vw"
          className=" object-contain"
        />
        <span className="text-sm text-black">Signin width google</span>
      </Button>
    </>
  )
}
