import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const tokenValue = req.cookies.get("next-auth.session-token")?.value

  const isAuth = !!tokenValue

  if ((req.url.includes('/signin') || req.url.includes('/signup')) && isAuth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup', '/'],
}
