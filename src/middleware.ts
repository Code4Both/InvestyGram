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
        // Redirect to login page
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        
        // Check if the token is valid and contains user information
        if (!payload.id || !payload.userType) {
            // Invalid token, redirect to login
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        // Additional check for specific user type routes
        if (request.nextUrl.pathname.startsWith("/startups") && payload.userType !== "startup") {
            // Investor trying to access startup pages
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        if (request.nextUrl.pathname.startsWith("/investor") && payload.userType !== "investor") {
            // Startup trying to access investor pages
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // Token verification failed, redirect to login
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.svg|.*\\.gif).*)",
    ],
  };