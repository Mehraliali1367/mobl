import { NextResponse } from "next/server";
import { getToken } from "./actions/auth/loginAction";

export async function middleware(request) {
  try {
    const access_token = await getToken("access-token");
    if (access_token?.error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  // matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
  matcher: ["/profile/:path*","/cart"],
};

// !accessToken && request.nextUrl.pathname !== "/"
