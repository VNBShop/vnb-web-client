import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'

type DataResponse = {
  data: {
    metadata: TData & { message?: string }
    success: boolean
  }
}

type DataError = {
  response: {
    data: {
      metadata: TData & { message?: string }
      success: boolean
    }
  }
}
