import type { Metadata } from 'next'

import { Toaster } from 'sonner'
import './../src/styles/globals.css'

import RQProvider from '@/components/provider'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.subName}`,
  },
  description: 'Generated by create next app',
  icons: '/common/icon.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth font-sans antialiased">
        <RQProvider>{children}</RQProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
