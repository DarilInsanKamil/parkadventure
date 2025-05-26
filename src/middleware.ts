import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { existsSync } from 'fs';
import { join } from 'path';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Check if the request is for the admin dashboard
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Check if the request is for the auth pages
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  // Redirect logic
  if (isAdminRoute) {
    // If trying to access admin routes without authentication
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Continue if authenticated
    return NextResponse.next();
  }

  if (isAuthPage) {
    // If already authenticated and trying to access auth pages
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Continue if not authenticated
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/images/packages/')) {
    // Redirect package images to API route
    return NextResponse.redirect(
      new URL(`/api/images${pathname}`, request.url)
    );
  }

  if (pathname.startsWith('/images/gallery')) {
    // Handle uploads separately if needed
    const parts = pathname.split('/');
    const filename = parts[parts.length - 1];
    return NextResponse.redirect(
      new URL(`/api/images/gallery/${filename}`, request.url)
    );
  }


  // For all other routes, just continue
  return NextResponse.next();
}

// Configure the middleware to run only on specific routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
    '/images/packages/:path*',
    '/images/gallery/:path*',
    '/uploads/:path*'
  ]
};