'use client'
import { PropsWithChildren, createContext, useContext } from 'react'

import { Session } from 'next-auth'

export type UserContext = Session['user']

const UserContext = createContext<UserContext>({} as UserContext)

export function useUserContext() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext must be use in UserContextProvider')
  }

  return context
}

type IProps = PropsWithChildren & {
  user: UserContext
}

export function UserContextProvider({ user, children }: IProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
