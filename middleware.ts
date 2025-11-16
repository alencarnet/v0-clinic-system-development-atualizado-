import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Skip middleware for API routes, static files, and Next.js internals
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/static/') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if it's a public booking URL
  if (url.pathname.startsWith('/agendamentos/')) {
    // Extract clinic slug from path: /agendamentos/bella-estetica/...
    const pathParts = url.pathname.split('/').filter(Boolean)
    
    if (pathParts.length >= 2) {
      const clinicSlug = pathParts[1]
      
      // Add clinic slug to headers for the public page to access
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-clinic-slug', clinicSlug)
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
