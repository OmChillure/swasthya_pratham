import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const cookie = cookieStore.get('user_email');
    
    if (!cookie && !request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

    if (request.nextUrl.pathname.startsWith('/login') && cookie ) {
        return NextResponse.redirect(new URL('/profile', request.url))
      }

    return
     
} 
 
export const config = {
  matcher: ["/login" ,"/dashboard/:path*" , "/register"],
}