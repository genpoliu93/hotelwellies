import { type NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}

const defaultLocale = "ja"
const locales = ["en", "ja", "zh"]

export function middleware(request: NextRequest) {
  // 获取请求路径和主机名
  const { pathname } = request.nextUrl

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  // 如果路径不包含语言前缀，重定向到默认语言
  const newUrl = new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}`, request.url)

  return NextResponse.redirect(newUrl)
}
