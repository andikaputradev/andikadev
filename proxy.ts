import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const proto = request.headers.get('x-forwarded-proto')

  // Kanonikalisasi host dan protokol ke https://andikadev.com
  if (
    host.startsWith('www.andikadev.com') ||
    (proto === 'http' && host === 'andikadev.com')
  ) {
    const search = request.nextUrl.search
    const pathname = request.nextUrl.pathname
    return NextResponse.redirect(
      new URL(`${pathname}${search}`, 'https://andikadev.com'),
      308
    )
  }

  const response = NextResponse.next()

  // Header cache control untuk aset statis
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|ico|css|js|woff|woff2|ttf|eot)$/)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Berlaku untuk semua path kecuali:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

