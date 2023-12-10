/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXT_SERVER_URL: process.env.NEXT_SERVER_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  },
}

module.exports = nextConfig
