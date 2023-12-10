import { jwtDecode } from "jwt-decode"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },

      async authorize(credentials, req) {

        const res = await fetch(`${process.env.NEXT_SERVER_URL}/account/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        const data = await res.json()

        if (data?.success) {
          const info = jwtDecode(data?.metadata?.accessToken)

          if (!!info) {
            return {
              ...data?.metadata,
              ...info
            }
          }

          return data?.metadata

        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) return { ...token, ...user }

      return token
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },

  },
  pages: {
    signIn: '/signin'
  }
}
