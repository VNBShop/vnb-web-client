import { useEffect, useState } from 'react'

import { Socket, io } from 'socket.io-client'

import { useUserContext } from '@/context/user'

export default function useSocketNotify() {
  const user = useUserContext()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    try {
      const socketIns = io(
        `${process.env.NEXT_SERVER_API_SOCKET}/notification`,
        {
          withCredentials: true,
          query: {
            token: user?.accessToken,
          },
          transports: ['websocket', 'polling'],
        }
      )

      setSocket(socketIns)

      socketIns.on('connect_error', (err) => {
        console.log('socket error >>>', err)
      })

      socketIns.on('connect', () => {
        console.log('Socket notify has connected!')
      })

      socketIns.on('error', (error) => {
        console.error('Socket notify error:', error)
        // Handle socket errors here
      })

      return () => {
        if (socketIns) {
          socketIns.disconnect()
        }
      }
    } catch (error) {
      console.error('Error connecting to socket:', error)
    }
  }, [user?.accessToken])

  return socket
}
