import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname === "/login" ||
      url.pathname === "/signup" ||
      url.pathname === "/terms")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = { matcher: ["/login", "/signup", "/terms"] };
