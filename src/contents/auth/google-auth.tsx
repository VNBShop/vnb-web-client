'use client'

import { useEffect } from 'react'

import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

export default function GoogleOAuth() {
  const handleAuthWithGoogle = (response: {
    clientId: string
    client_id: string
    credential: string
  }) => {
    console.log('>>', response)
    const { credential } = response
    if (!!credential) {
      const auth = jwtDecode(credential)
    } else {
      toast.error('Authentication with gooogle faild, try again!')
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => {
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: handleAuthWithGoogle,
      })

      const signInButton = document.getElementById('google-signin')

      if (signInButton) {
        google.accounts.id.renderButton(signInButton, {
          theme: 'outline',
          size: 'large',
        })
      }
    }
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <button id="google-signin"></button>
    </>
  )
}
