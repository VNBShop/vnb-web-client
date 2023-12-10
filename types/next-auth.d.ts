import NextAuth from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      isFirstLogin: boolean
      accessToken: string
      refreshToken: string
      userId: number
      username: string
      avatar: string
    }
  }
}
