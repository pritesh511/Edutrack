import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/") return;

  const isPublicUrl = currentPath === "/login" || currentPath === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicUrl && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/subject",
    "/dashboard/teacher",
    "/dashboard/standard",
    "/dashboard/subject",
  ],
};
