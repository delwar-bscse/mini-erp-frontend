import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./utils/getToken";


 
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = [
    "/sign-in",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ].includes(path);

  const token = await getToken();

  if (!isPublicPath && !token) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};