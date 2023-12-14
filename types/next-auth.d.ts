import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string
      image?: string
      isFirstLogin: boolean
      accessToken: string
      refreshToken: string
      userId: number
      username: string
      avatar: string
    }
  }
}
