import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    //consultar as cookies
    if(!request.cookies.get("token"))
        return NextResponse.redirect(new URL('/login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/locatario/:path*'],
}