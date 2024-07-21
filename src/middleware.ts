import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const userEmail = cookieStore.get('user')

  console.log('Cookies:', cookieStore)
  console.log('User Email Cookie:', userEmail)

  if (!userEmail && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (userEmail && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register","/dashboard/:path*", "/dashboard"],
}
