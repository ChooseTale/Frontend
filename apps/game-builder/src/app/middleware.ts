import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request);

  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/about/:path*",
};
