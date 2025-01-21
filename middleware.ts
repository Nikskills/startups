import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)


export default auth(async (req) => {
  const isLoggedIn = !!req.auth
  
  // Add detailed logging
  console.log("=== MIDDLEWARE DEBUG ===")
  console.log({
    path: req.nextUrl.pathname,
    isLoggedIn,
    headers: Object.fromEntries(req.headers),
    timestamp: new Date().toISOString()
  })

  // Force authentication for protected routes
  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/:path*',
    '/',
    '/login',
    '/register'
  ]
}