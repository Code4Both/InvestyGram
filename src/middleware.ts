import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    // Allow public access to the home page ("/"), auth pages, and API auth routes
    if (
        request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname.startsWith("/auth") ||
        request.nextUrl.pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.svg|.*\\.gif).*)",
    ],
  };