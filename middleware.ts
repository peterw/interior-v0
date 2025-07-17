import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes } from './config/routes'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/interior',
]

// Define public routes that should redirect to dashboard if already authenticated
const publicAuthRoutes = ['/auth/login', '/auth/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If we're at the root, redirect to signup
  if (pathname === '/') {
    return NextResponse.redirect(new URL(authRoutes.signup.path, request.url))
  }
  
  // Check if the route requires protection
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicAuthRoute = publicAuthRoutes.some(route => pathname.startsWith(route))

  // Get the token from the cookies
  const accessToken = request.cookies.get('accessToken')?.value

  // If accessing a protected route without a token, redirect to signup
  if (isProtectedRoute && !accessToken) {
    const url = new URL(authRoutes.signup.path, request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // If accessing auth routes with a valid token, redirect to interior
  if (isPublicAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/interior', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}