/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SERECT: process.env.GOOGLE_CLIENT_SERECT,
    NEXT_SERVER_API_SERVICE: process.env.NEXT_SERVER_API_SERVICE,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      }, {
        hostname: 'www.badmintonplanet.eu'
      }
    ]
  }
}

module.exports = nextConfig
