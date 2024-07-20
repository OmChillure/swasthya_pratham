import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const cookie = cookieStore.get('user_email');
    
    if (!cookie && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

    if (cookie && request.nextUrl.pathname.startsWith('/login') ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

    return
     
} 
 
export const config = {
  matcher: ["/login" ,"/dashboard/:path*" , "/dashboard" , "/register"],
}
