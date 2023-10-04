/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function GoogleOAuth() {
  const handleAuthWithGoogle = (response: any) => {
    // console.log('response', response)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      callback: handleAuthWithGoogle,
    })

    const signInButton = document.getElementById('google-signin')

    if (!signInButton) return

    google.accounts.id.renderButton(signInButton, {
      theme: 'outline',
      size: 'large',
    })
  })

  return (
    <>
      <button id="google-signin"></button>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
        async
      />
    </>
  )
}
