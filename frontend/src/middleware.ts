import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("object");
  return NextResponse.next();
}

export const config = {
  matcher: "/em-admin/:path*",
};
