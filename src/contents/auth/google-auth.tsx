/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client'

import { useEffect } from 'react'

import Script from 'next/script'

export default function GoogleOAuth() {
  const handleAuthWithGoogle = (response: any) => {
    console.log('response', response)
  }

  // useEffect(() => {
  //   if (!window.google) return
  //   google.accounts.id.initialize({
  //     client_id: process.env.GOOGLE_CLIENT_ID,
  //     callback: handleAuthWithGoogle,
  //   })

  //   const signInButton = document.getElementById('google-signin')

  //   if (!signInButton) return

  //   google.accounts.id.renderButton(signInButton, {
  //     theme: 'outline',
  //     size: 'large',
  //   })
  // }, [])

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
      {/* <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
        async
      /> */}
    </>
  )
}
