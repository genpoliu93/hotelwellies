import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了:
     * - API 路由 (/api/*)
     * - 静态文件 (例如: /static/*)
     * - 下一个公共文件 (例如: /favicon.ico, /sitemap.xml, /robots.txt)
     * - 媒体文件 (例如: /media/*)
     */
    "/((?!api|static|media|_next/static|_next/image|favicon.ico).*)",
  ],
};

const defaultLocale = "ja";
const locales = ["en", "ja", "zh"];

export function middleware(request: NextRequest) {
  // 获取请求路径和主机名
  const { pathname } = request.nextUrl;

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 处理语言重定向
  if (!pathnameHasLocale) {
    // 如果路径不包含语言前缀，重定向到默认语言
    const newUrl = new URL(
      `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
      request.url
    );
    return NextResponse.redirect(newUrl);
  }

  // 处理 CORS
  // 克隆请求头以修改
  const requestHeaders = new Headers(request.headers);

  // 获取响应
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 添加 CORS 头信息
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", "*"); // 在生产环境中应限制为特定域名
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return response;
}
