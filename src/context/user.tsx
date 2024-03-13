'use client'
import { PropsWithChildren, createContext, useContext } from 'react'

import { redirect, useRouter } from 'next/navigation'
import { Session } from 'next-auth'

import { signOut } from 'next-auth/react'

import useSignout from '@/hooks/commons/useSignout'

export type UserContext = Session['user']

const UserContext = createContext<UserContext>({} as UserContext)

export function useUserContext() {
  const context = useContext(UserContext)
  const router = useRouter()

  if (!context) {
    console.log('useUserContext must be use in UserContextProvider')
    // signOut()
    return redirect('/')
  }

  return context
}

type IProps = PropsWithChildren & {
  user: UserContext
}

export function UserContextProvider({ user, children }: IProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
