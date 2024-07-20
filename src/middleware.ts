import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle redirects based on user authentication status
export function middleware(request: NextRequest) {
  const cookieStore = request.cookies // Access cookies from the request
  const userEmail = cookieStore.get('user_email') // Get the 'user_email' cookie

  console.log('Cookies:', cookieStore)
  console.log('User Email Cookie:', userEmail)

  // Redirect to login if the 'user_email' cookie is not present and the user is not already on login or register pages
  if (!userEmail && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if the 'user_email' cookie is present and the user is trying to access the login page
  if (userEmail && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Return undefined to continue with the normal request flow if no redirects are needed
  return NextResponse.next()
}

// Configuring the paths where this middleware should be applied
export const config = {
  matcher: ["/login", "/dashboard/:path*", "/dashboard", "/register"],
}
