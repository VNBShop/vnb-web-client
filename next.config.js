/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SERECT: process.env.GOOGLE_CLIENT_SERECT,
    NEXT_SERVER_API_SERVICE: process.env.NEXT_SERVER_API_SERVICE,
    REACT_APP_CLOUDINARY_CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_API_KEY: process.env.REACT_APP_CLOUDINARY_API_KEY,
    REACT_APP_CLOUDINARY_API_SECRET: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    NEXT_SERVER_API_SOCKET: process.env.NEXT_SERVER_API_SOCKET
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      }, {
        hostname: 'www.badmintonplanet.eu'
      },
      {
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

module.exports = nextConfig
