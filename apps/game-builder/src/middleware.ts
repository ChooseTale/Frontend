import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authKey = process.env.AUTH_KEY;
  const requestHeaders = new Headers(request.headers);

  if (authKey) {
    requestHeaders.set("authorization-jwt", `${authKey}`);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
