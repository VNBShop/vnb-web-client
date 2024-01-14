import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      isFirstLogin: boolean
      accessToken: string
      refreshToken: string
      firstName: string
      lastName: string
      avatar: string
      email: string
      provider: 'LOCAL' | 'GOOGLE'
    }
  }
}
