import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 如果已经在首页，则不需要重定向
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  // 将所有其他路径重定向到首页
  return NextResponse.redirect(new URL('/', request.url))
}

// 配置需要运行中间件的路径
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 