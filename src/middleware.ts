import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = req.cookies.get('kf_admin_session')?.value
    const isValid = await verifySessionToken(token)

    if (!isValid) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
