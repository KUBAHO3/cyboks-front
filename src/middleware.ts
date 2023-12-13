import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { USER_ROLES } from "./utils/constants";

export const config = {
  runtime: "experimental-edge", // Use the experimental edge runtime
};

export async function middleware(request: NextRequest) {
  const decodedToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Key variables
  const url = request.nextUrl.pathname;
  const userRole = decodedToken?.user.role;

  // Protected routes
  if (!decodedToken && url.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Guest routes
  if (decodedToken && url.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/cyboks", request.url));
  }

  if (decodedToken && url == "/") {
    return NextResponse.redirect(new URL("/dashboard/cyboks", request.url));
  }

  // Role-based
  if (decodedToken && url === `/dashboard/cyboks` && userRole === USER_ROLES.DPO) {
    return NextResponse.redirect(new URL(`/dashboard/dpo`, request.url));
  }

  if (
    decodedToken &&
    url === `/dashboard/ncsa` &&
    userRole === USER_ROLES.DPO
  ) {
    return NextResponse.redirect(new URL(`/dashboard/dpo`, request.url));
  }

  if (
    decodedToken &&
    url === `/dashboard/dpo` &&
    userRole === USER_ROLES.REVIEWER
  ) {
    return NextResponse.redirect(new URL(`/dashboard/cyboks`, request.url));
  }

  if (
    decodedToken &&
    url === `/dashboard/ncsa` &&
    userRole === USER_ROLES.REVIEWER
  ) {
    return NextResponse.redirect(new URL(`/dashboard/cyboks`, request.url));
  }

  if (
    decodedToken &&
    url === `/dashboard/dpo` &&
    userRole === USER_ROLES.NCSA
  ) {
    return NextResponse.redirect(new URL(`/dashboard/ncsa`, request.url));
  }

  if (
    decodedToken &&
    url === `/dashboard/cyboks` &&
    userRole === USER_ROLES.NCSA
  ) {
    return NextResponse.redirect(new URL(`/dashboard/ncsa`, request.url));
  }
}
