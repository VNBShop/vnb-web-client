import { useEffect, useState } from 'react'

import { Socket, io } from 'socket.io-client'

import { useUserContext } from '@/context/user'

import { Chat, ChatResponse } from '../../../types/messenger'

type IProps = {
  room: ChatResponse['room']
}

export default function useSocketChat({ room }: IProps) {
  const user = useUserContext()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (!room) return
    try {
      const socketIns = io(`${process.env.NEXT_SERVER_API_SOCKET}/chat`, {
        withCredentials: true,
        query: {
          room: room,
          token: user?.accessToken,
        },
        transports: ['websocket', 'polling'],
      })

      setSocket(socketIns)

      socketIns.on('connect_error', (params) => {
        console.log('socket error >>>', params?.cause)
      })

      socketIns.on('connect', () => {
        console.log('Socket chat connected!')
      })

      socketIns.on('error', (error) => {
        console.error('Socket error:', error)
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
  }, [room, user?.accessToken])

  return socket
}
