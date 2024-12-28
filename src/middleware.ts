import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isPublicUrl = currentPath === "/login" || currentPath === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if(isPublicUrl && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
  };

  if(!isPublicUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  };
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/student/:id"],
};
