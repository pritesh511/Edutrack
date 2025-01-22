import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/") return;

  const isPublicUrl = currentPath === "/login" || currentPath === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (token) {
    const secretKey = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    const userRole = payload.role;

    try {
      const defaultRoutes: Record<string, string> = {
        admin: "/dashboard",
        teacher: "/dashboard/student",
      };

      const defaultRedirect = defaultRoutes[userRole as string] || "/dashboard";

      if (isPublicUrl) {
        return NextResponse.redirect(new URL(defaultRedirect, request.nextUrl));
      }

      const rolesPermissions: Record<string, string[]> = {
        admin: [
          "/dashboard",
          "/dashboard/subject",
          "/dashboard/teacher",
          "/dashboard/standard",
          "/dashboard/subject",
          "/dashboard/student",
          "/dashboard/attendance",
          "/dashboard/report"
        ],
        teacher: [
          "/dashboard/student",
          "/dashboard/attendance",
          "/dashboard/report"
        ],
      };

      const allowedPaths = rolesPermissions[userRole as string] || [];

      if (!allowedPaths.includes(currentPath)) {
        return NextResponse.redirect(new URL(defaultRedirect, request.nextUrl));
      };

    } catch (error: any) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } else if (!isPublicUrl) {
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
    "/dashboard/student",
    "/dashboard/attendance",
    "/dashboard/report"
  ],
};
